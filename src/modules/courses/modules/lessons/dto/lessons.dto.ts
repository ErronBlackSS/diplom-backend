import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

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
  order: number;
}
