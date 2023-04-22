import { ApiProperty } from '@nestjs/swagger';
import { Course } from '@prisma/client';
import { IsString } from 'class-validator';
import { ExposedCourse } from '../courses';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Название курса',
  })
  @IsString()
  name: string;
}

export function convertToCourseResponse(
  course: Course,
): ExposedCourse {
  return {
    id: course.id,
    name: course.name,
    dateCreate: course.createdAt,
    creatorId: course.creatorId,
  };
}
