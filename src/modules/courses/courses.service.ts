import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { UserInfo } from '../user/user';
import { CourseContent, ExposedCourse } from './courses';
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
    const modules = await this.prisma.courseModule.findMany(
      {
        where: {
          courseId: courseId,
        },
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          lessons: true,
        },
      },
    );

    return {
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
}
