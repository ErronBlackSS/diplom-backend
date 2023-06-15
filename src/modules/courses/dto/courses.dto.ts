import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';
import { ExposedCourse, PrismaCourse } from '../courses';

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

export class ChangeCourseImageDto {
  @ApiProperty({
    description: 'Картинка курса',
  })
  image: FormData;
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
  course: PrismaCourse,
): ExposedCourse {
  return {
    id: course.id,
    name: course.name,
    dateCreate: course.createdAt,
    creatorId: course.creatorId,
    published: course.published,
    promo: course.promo,
    imagePath: course.CourseImage
      ? `${process.env.API_URL}/${course.CourseImage.path}`
      : null,
  };
}
