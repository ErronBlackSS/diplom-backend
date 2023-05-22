import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsString,
} from 'class-validator';
import { ModulesWithLessons } from '../lessons.types';

export class CreateLessonDto {
  @ApiProperty({
    description: 'Название урока',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Порядковый номер урока',
  })
  @IsString()
  moduleId: number;

  @ApiProperty({
    description: 'Порядковый номер урока',
  })
  @IsString()
  order: number;
}

export class LessonsByModuleDto {
  @ApiProperty({
    description: 'Название курса',
  })
  @IsString()
  courseName: string;

  @ApiProperty({
    description: 'Уроки по модулям',
  })
  @IsArray()
  modules: ModulesWithLessons[];
}

export class ChangeLessonOrderDto {
  @ApiProperty({
    description: 'Новый порядковый номер урока',
  })
  @IsString()
  @IsNumber()
  order: number;
}
