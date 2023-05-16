import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsString,
} from 'class-validator';
import { LessonWithSteps } from '../lessons.types';

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

export class ModuleLessonsWithSteps {
  @ApiProperty({
    description: 'Название модуля',
  })
  @IsString()
  moduleName: string;

  @ApiProperty({
    description: 'Id модуля',
  })
  @IsNumber()
  moduleId: number;

  @ApiProperty({
    description: 'Шаги урока',
  })
  @IsArray()
  lessons: LessonWithSteps[];
}

export class changeLessonOrderDto {
  @ApiProperty({
    description: 'Новый порядковый номер урока',
  })
  @IsString()
  @IsNumber()
  order: number;
}
