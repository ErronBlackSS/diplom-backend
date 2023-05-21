import { ApiProperty } from '@nestjs/swagger';
import { ModuleLesson } from '@prisma/client';
import {
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Lesson } from '../../lessons/lessons.types';
import { Module, PrismaCourseModule } from '../modules';

export class CreateModuleDto {
  @ApiProperty({
    description: 'Название модуля',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'ID курса',
  })
  @IsString()
  courseId: number;

  @ApiProperty({
    description: 'Порядковый номер модуля',
  })
  @IsString()
  order: number;
}

export class changeModuleDto {
  @ApiProperty({
    description: 'Название модуля',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Описание модуля',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Id курса',
  })
  @IsString()
  @IsOptional()
  courseId: number;

  @ApiProperty({
    description: 'Порядковый номер модуля',
  })
  @IsNumber()
  @IsOptional()
  order: number;
}

export function convertLessonsToLessonsResponse(
  lessons: ModuleLesson[],
): Lesson[] {
  return lessons.map((lesson) => ({
    id: lesson.id,
    moduleId: lesson.moduleId,
    name: lesson.name,
    order: lesson.order,
  }));
}

export function convertFromModule(
  module: PrismaCourseModule,
): Module {
  return {
    id: module.id,
    courseId: module.courseId,
    name: module.name,
    description: module.description,
    order: module.order,
    lessons: convertLessonsToLessonsResponse(
      module.lessons,
    ),
  };
}

export function convertModuleToModuleResponse(
  modules: PrismaCourseModule[],
): Module[];
export function convertModuleToModuleResponse(
  modules: PrismaCourseModule,
): Module;
export function convertModuleToModuleResponse(
  modules: PrismaCourseModule | PrismaCourseModule[],
): Module | Module[] {
  if (Array.isArray(modules)) {
    return modules.map((module) =>
      convertFromModule(module),
    );
  }

  return convertFromModule(modules);
}
