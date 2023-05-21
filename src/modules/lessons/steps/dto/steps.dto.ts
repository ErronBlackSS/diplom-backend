import {
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { StepType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStepDto {
  @ApiProperty({
    description: 'Тип шага',
  })
  @IsString()
  type: StepType;

  @ApiProperty({
    description: 'Контент шага',
  })
  @IsString()
  content: string;
}

export class UpdateStepContentDto {
  @ApiProperty({
    description: 'Новый контент шага',
  })
  @IsString()
  content: string;
}

export class CreateAnswerDto {
  @ApiProperty({
    description: 'Id теста',
  })
  @IsNumber()
  testId: number;

  @ApiProperty({
    description: 'Название ответа',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Порядковый номер ответа',
  })
  @IsString()
  order: number;
}

export class ChangeAnswerDto {
  @ApiProperty({
    description: 'Новый текст вопроса',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Порядковый номер вопроса',
  })
  @IsNumber()
  @IsOptional()
  order: number;
}
