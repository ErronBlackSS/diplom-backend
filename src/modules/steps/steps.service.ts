import { Injectable } from '@nestjs/common';
import { StepType } from '@prisma/client';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import {
  CreateStepDto,
  UpdateStepContentDto,
} from './dto/steps.dto';

@Injectable()
export class StepsService {
  constructor(private prisma: PrismaService) {}

  async getStep(stepId: number) {
    const step = await this.prisma.lessonStep.findUnique({
      where: {
        id: stepId,
      },
      include: {
        test: {
          include: {
            answers: true,
          },
        },
      },
    });

    const flattenedStep = {
      stepId: step.id,
      content: step.content,
    };

    const flattenedTest = step.test
      ? {
          id: step.test.id,
          stepId: step.test.stepId,
          answers: step.test.answers.map((answer) => ({
            id: answer.id,
            order: answer.order,
            name: answer.name,
            isRight: answer.isRight,
            testId: answer.testId,
          })),
        }
      : null;

    return {
      step: flattenedStep,
      type: step.type,
      test: flattenedTest,
    };
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

  async updateStepContent(
    stepId: number,
    dto: UpdateStepContentDto,
  ) {
    await this.prisma.lessonStep.update({
      where: {
        id: stepId,
      },
      data: {
        content: dto.content,
      },
    });
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
