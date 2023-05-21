import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import {
  ChangeAnswerDto,
  CreateAnswerDto,
} from './dto/steps.dto';

@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}

  async createAnswer(dto: CreateAnswerDto) {
    const newAnswer = await this.prisma.testAnswer.create({
      data: {
        name: dto.name,
        order: dto.order,
        test: {
          connect: {
            id: dto.testId,
          },
        },
      },
    });

    return newAnswer;
  }

  async сhangeAnswer(
    answerId: number,
    dto: ChangeAnswerDto,
  ) {
    const updatedAnswer =
      await this.prisma.testAnswer.update({
        where: {
          id: answerId,
        },
        data: dto,
      });

    return updatedAnswer;
  }
}
