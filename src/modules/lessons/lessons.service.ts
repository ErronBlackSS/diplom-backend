import { Injectable } from '@nestjs/common';
import { StepType } from '@prisma/client';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import {
  changeLessonOrderDto,
  CreateLessonDto,
  ModuleLessonsWithSteps,
} from './dto/lessons.dto';
import { Lesson } from './lessons.types';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async createLesson(
    dto: CreateLessonDto,
  ): Promise<Lesson> {
    const newLesson = await this.prisma.moduleLesson.create(
      {
        data: {
          name: dto.name,
          order: dto.order,
          module: {
            connect: {
              id: dto.moduleId,
            },
          },
        },
      },
    );

    await this.prisma.lessonStep.create({
      data: {
        content: 'Новый шаг урока!',
        type: StepType.TEXT,
        lesson: {
          connect: {
            id: newLesson.id,
          },
        },
      },
    });

    return newLesson;
  }

  async getModuleLessons(
    moduleId: number,
  ): Promise<ModuleLessonsWithSteps> {
    const module =
      await this.prisma.courseModule.findUnique({
        where: {
          id: moduleId,
        },
        include: {
          lessons: {
            include: {
              steps: true,
            },
          },
        },
      });

    const flattenedLessons = module.lessons.map(
      (lesson) => ({
        id: lesson.id,
        name: lesson.name,
        order: lesson.order,
        moduleId: lesson.moduleId,
        steps: lesson.steps.map((step) => ({
          id: step.id,
          type: StepType[step.type],
        })),
      }),
    );

    return {
      moduleId: module.id,
      moduleName: module.name,
      lessons: flattenedLessons,
    };
  }

  async changeLessonOrder(
    lessonId: number,
    dto: changeLessonOrderDto,
  ): Promise<Lesson> {
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
