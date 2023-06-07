import { ApiProperty } from '@nestjs/swagger';
import { Course } from '@prisma/client';
import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';
import { ExposedCourse } from '../courses';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Название курса',
  })
  @IsString()
  name: string;
}

export class ChangeCourseDto {
  @ApiProperty({
    description: 'Название курса',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Статус публикации',
  })
  @IsOptional()
  @IsBoolean()
  published: boolean;
}

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

export function convertToCourseResponse(
  course: Course,
): ExposedCourse {
  return {
    id: course.id,
    name: course.name,
    dateCreate: course.createdAt,
    creatorId: course.creatorId,
    published: course.published,
    promo: course.promo,
  };
}
