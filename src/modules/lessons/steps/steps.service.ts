import { Injectable } from '@nestjs/common';
import { StepType } from '@prisma/client';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CreateStepDto } from './dto/steps.dto';

@Injectable()
export class StepsService {
  constructor(private prisma: PrismaService) {}

  async getLessonSteps(lessonId: number) {
    const steps = await this.prisma.lessonStep.findMany({
      where: {
        lessonId: lessonId,
      },
      include: {
        test: {
          include: {
            answers: true,
          },
        },
      },
    });

    const convertedSteps = steps.map((step) => {
      const flattenedStep = {
        id: step.id,
        type: step.type,
        content: step.content,
        test: undefined,
      };
      let test;
      if (step.test) {
        test = {
          id: step.test.id,
          stepId: step.test.stepId,
          answers: step.test.answers.map((answer) => ({
            id: answer.id,
            name: answer.name,
            isRight: answer.isRight,
            testId: answer.testId,
          })),
        };
      }
      flattenedStep.test = test || undefined;
      return flattenedStep;
    });

    return convertedSteps;
  }

  async createStep(lessonId: number, dto: CreateStepDto) {
    const { type, content } = dto;

    const step = await this.prisma.lessonStep.create({
      data: {
        type: type,
        content: content,
        lesson: {
          connect: {
            id: lessonId,
          },
        },
      },
    });

    if (type === StepType.TEST) {
      await this.createTest(step.id);
    }

    return step;
  }

  private async createTest(stepId: number) {
    const test = await this.prisma.test.create({
      data: {
        step: {
          connect: {
            id: stepId,
          },
        },
      },
    });

    return test;
  }
}
