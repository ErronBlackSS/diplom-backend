import { Injectable } from '@nestjs/common';
import { UserInfo } from 'src/modules/user/user';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import {
  convertModuleToModuleResponse,
  CreateModuleDto,
} from './dto/module.dto';
import { Module } from './modules';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) {}

  async createModule(
    user: UserInfo,
    dto: CreateModuleDto,
    courseId: number,
  ): Promise<Module> {
    const newModule = await this.prisma.courseModule.create(
      {
        data: {
          name: dto.name,
          order: dto.order,
          course: {
            connect: {
              id: courseId,
            },
          },
        },
        include: {
          lessons: true,
        },
      },
    );

    return convertModuleToModuleResponse(newModule);
  }
}
