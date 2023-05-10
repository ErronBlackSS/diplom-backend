import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import {
  changeLessonOrderDto,
  CreateLessonDto,
} from './dto/lessons.dto';
import { Lesson } from './lessons';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async createLesson(
    dto: CreateLessonDto,
    moduleId: number,
  ): Promise<Lesson> {
    const newLesson = await this.prisma.moduleLesson.create(
      {
        data: {
          name: dto.name,
          order: dto.order,
          module: {
            connect: {
              id: moduleId,
            },
          },
        },
      },
    );

    return newLesson;
  }

  async changeLessonOrder(
    lessonId: number,
    dto: changeLessonOrderDto,
  ): Promise<Lesson> {
    console.log('ALESHKA');
    return this.prisma.moduleLesson.update({
      where: {
        id: lessonId,
      },
      data: {
        order: dto.order,
      },
    });
  }
}
