import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { UserInfo } from '../user/user.types';
import {
  CourseChecklist,
  CourseContent,
  ExposedCourse,
} from './courses';
import {
  ChangeCourseDto,
  convertToCourseResponse,
  CreateCourseDto,
} from './dto/courses.dto';
import { convertModuleToModuleResponse } from '../modules/dto/module.dto';
import { ConfigService } from '@nestjs/config';
import { API_URL } from 'src/constants/config.constants';

@Injectable()
export class CoursesService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async getUserOwnerCourses(
    user: UserInfo,
  ): Promise<ExposedCourse[]> {
    const userCourses = await this.prisma.course.findMany({
      where: {
        creatorId: user.userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        CourseImage: {
          select: {
            path: true,
          },
        },
      },
    });

    return userCourses.map((course) =>
      convertToCourseResponse(course),
    );
  }

  async getUserCourses(
    user: UserInfo,
  ): Promise<ExposedCourse[]> {
    const userCourses = await this.prisma.course.findMany({
      where: {
        UsersOnCourse: {
          some: {
            userId: user.userId,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        CourseImage: {
          select: {
            path: true,
          },
        },
        modules: {
          include: {
            lessons: {
              include: {
                steps: {
                  include: {
                    usersPassed: {
                      select: {
                        userId: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return userCourses.map((course) => {
      let stepsCount = 0;
      let passedStepsCount = 0;

      course.modules.forEach((module) => {
        module.lessons.forEach((lesson) => {
          lesson.steps.forEach((step) => {
            stepsCount += 1;
            const userPassedIds = step.usersPassed.map(
              (user) => user.userId,
            );
            if (userPassedIds.includes(user.userId)) {
              passedStepsCount += 1;
            }
          });
        });
      });

      return {
        id: course.id,
        name: course.name,
        dateCreate: course.createdAt,
        creatorId: course.creatorId,
        published: course.published,
        promo: course.promo,
        imagePath: course.CourseImage
          ? `${this.config.get(API_URL)}/${
              course.CourseImage.path
            }`
          : null,
        stepsCount: stepsCount,
        passedStepsCount: passedStepsCount,
      };
    });
  }

  async bookOnCourse(courseId: number, userId: number) {
    const userOnCourse =
      await this.prisma.usersOnCourse.create({
        data: {
          userId: userId,
          courseId: courseId,
        },
      });

    return userOnCourse;
  }

  async createCourse(
    user: UserInfo,
    data: CreateCourseDto,
  ): Promise<ExposedCourse> {
    const { name } = data;
    const course = await this.prisma.course.create({
      data: {
        name: name,
        creator: {
          connect: {
            id: user.userId,
          },
        },
      },
      include: {
        CourseImage: {
          select: {
            path: true,
          },
        },
      },
    });

    return convertToCourseResponse(course);
  }

  async getCourseContent(
    courseId: number,
  ): Promise<CourseContent> {
    const [course, modules] =
      await this.prisma.$transaction([
        this.prisma.course.findUnique({
          where: {
            id: courseId,
          },
          include: {
            CourseImage: {
              select: {
                path: true,
              },
            },
          },
        }),
        this.prisma.courseModule.findMany({
          where: {
            courseId: courseId,
          },
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            lessons: true,
          },
        }),
      ]);

    return {
      course: convertToCourseResponse(course),
      modules: convertModuleToModuleResponse(modules),
    };
  }

  async deleteCourse(courseId: number) {
    await this.prisma.course.delete({
      where: {
        id: courseId,
      },
    });
  }

  async changeCourse(
    courseId: number,
    dto: ChangeCourseDto,
  ) {
    const updatedCourse = await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: dto,
      include: {
        CourseImage: {
          select: {
            path: true,
          },
        },
      },
    });

    return convertToCourseResponse(updatedCourse);
  }

  async changeImage(
    courseId: number,
    file: Express.Multer.File,
  ) {
    const createdFile =
      await this.prisma.courseImage.upsert({
        where: {
          courseId: courseId,
        },
        update: {
          filename: file.originalname,
          path: file.path,
          size: file.size,
        },
        create: {
          filename: file.originalname,
          path: file.path,
          size: file.size,
          course: {
            connect: {
              id: courseId,
            },
          },
        },
      });

    return `${this.config.get(API_URL)}/${
      createdFile.path
    }`;
  }

  async getCourseChecklist(courseId: number) {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        modules: {
          include: {
            lessons: {
              include: {
                steps: {
                  include: {
                    test: {
                      include: {
                        answers: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const checkList: CourseChecklist = {
      enoughModules: 0,
      moduleNames: true,
      enoughLessons: 0,
      enoughTests: 0,
      testEnoughAnswers: true,
      testRightAnswers: true,
      emptyModules: true,
      enoughSteps: true,
      stepsEmptyContent: true,
    };

    const modules = course.modules;

    const allCourseLessons = modules.reduce(
      (acc, _module) => {
        acc = [...acc, ..._module.lessons];
        return acc;
      },
      [],
    );

    const allCourseSteps = allCourseLessons.reduce(
      (acc, lesson) => {
        acc = [...acc, ...lesson.steps];
        return acc;
      },
      [],
    );

    let testsCount = 0;
    allCourseSteps.forEach((step) => {
      if (
        step.content === 'Вопрос с вариантами ответа' ||
        step.content === 'Новый шаг урока!'
      ) {
        checkList.stepsEmptyContent = false;
      }

      if (step.test) {
        testsCount += 1;
        if (step.test.answers.length < 2) {
          checkList.testEnoughAnswers = false;
        }
        const existRigthAnswer = step.test.answers.filter(
          (answer) => answer.isRight,
        );
        if (existRigthAnswer.length === 0) {
          checkList.testRightAnswers = false;
        }
      }
    });

    allCourseLessons.forEach((lesson) => {
      if (lesson.steps.length < 3) {
        checkList.enoughSteps = false;
      }
    });

    modules.forEach((_module) => {
      if (_module.lessons.length === 0) {
        checkList.emptyModules = false;
      }
      if (_module.name === 'Новый модуль') {
        checkList.moduleNames = false;
      }
    });

    checkList.enoughTests = testsCount;
    checkList.enoughModules = modules.length;
    checkList.enoughLessons = allCourseLessons.length;

    return checkList;
  }
}
