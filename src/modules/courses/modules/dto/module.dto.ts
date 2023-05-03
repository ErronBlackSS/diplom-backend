import { ApiProperty } from '@nestjs/swagger';
import { CourseModule } from '@prisma/client';
import { IsString } from 'class-validator';
import { Module } from '../modules';

export class CreateModuleDto {
  @ApiProperty({
    description: 'Название модуля',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Порядковый номер модуля',
  })
  @IsString()
  order: number;
}

export function convertFromModule(
  module: CourseModule,
): Module {
  return {
    id: module.id,
    courseId: module.courseId,
    name: module.name,
    description: module.description,
    order: module.order,
  };
}

export function convertModuleToModuleResponse(
  modules: CourseModule[],
): Module[];
export function convertModuleToModuleResponse(
  modules: CourseModule,
): Module;
export function convertModuleToModuleResponse(
  modules: CourseModule | CourseModule[],
): Module | Module[] {
  if (Array.isArray(modules)) {
    return modules.map((module) =>
      convertFromModule(module),
    );
  }

  return convertFromModule(modules);
}
