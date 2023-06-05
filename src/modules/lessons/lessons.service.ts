import { Injectable } from '@nestjs/common';
import { StepType } from '@prisma/client';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import {
  ChangeLessonOrderDto,
  CreateLessonDto,
  LessonsByModuleDto,
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

  async getLessonSteps(lessonId: number) {
    const steps = await this.prisma.lessonStep.findMany({
      where: {
        lessonId: lessonId,
      },
      include: {
        usersPassed: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    const convertedSteps = steps.map((step) => ({
      id: step.id,
      type: step.type,
      usersPassed: step.usersPassed.map(
        (user) => user.userId,
      ),
    }));

    return convertedSteps;
  }

  async getModuleLessons(
    courseId: number,
  ): Promise<LessonsByModuleDto> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        modules: {
          include: {
            lessons: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    const flattenedModules = course.modules.map(
      (module) => ({
        id: module.id,
        name: module.name,
        lessons: module.lessons.map((lesson) => ({
          id: lesson.id,
          name: lesson.name,
          order: lesson.order,
        })),
      }),
    );

    return {
      courseName: course.name,
      modules: flattenedModules,
    };
  }

  async changeLessonOrder(
    lessonId: number,
    dto: ChangeLessonOrderDto,
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

  async deleteLesson(lessonId: number) {
    await this.prisma.moduleLesson.delete({
      where: {
        id: lessonId,
      },
    });
  }
}
