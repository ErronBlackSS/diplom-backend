import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import {
  changeModuleDto,
  convertModuleToModuleResponse,
  CreateModuleDto,
} from './dto/module.dto';
import { Module } from './modules';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) {}

  async createModule(
    dto: CreateModuleDto,
  ): Promise<Module> {
    const newModule = await this.prisma.courseModule.create(
      {
        data: {
          name: dto.name,
          order: dto.order,
          course: {
            connect: {
              id: dto.courseId,
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

  async changeModule(
    moduleId: number,
    dto: changeModuleDto,
  ): Promise<Module> {
    const updatedModule =
      await this.prisma.courseModule.update({
        where: {
          id: moduleId,
        },
        data: dto,
        include: {
          lessons: true,
        },
      });

    return convertModuleToModuleResponse(updatedModule);
  }
}
