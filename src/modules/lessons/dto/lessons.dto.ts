import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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

export class changeLessonOrderDto {
  @IsNumber()
  order: number;
}
