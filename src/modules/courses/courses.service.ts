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

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async getUserCourses(
    user: UserInfo,
  ): Promise<ExposedCourse[]> {
    const userCourses = await this.prisma.course.findMany({
      where: {
        creatorId: user.userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return userCourses.map((course) =>
      convertToCourseResponse(course),
    );
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
    });

    return convertToCourseResponse(updatedCourse);
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
        console.log(step.content, 'alo');
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
