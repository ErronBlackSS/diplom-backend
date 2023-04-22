import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { UserInfo } from '../user/user';
import { ExposedCourse } from './courses';
import {
  convertToCourseResponse,
  CreateCourseDto,
} from './dto/courses.dto';

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
}
