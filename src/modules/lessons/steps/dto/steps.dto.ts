import { IsString } from 'class-validator';
import { StepType } from '@prisma/client';

export class CreateStepDto {
  @IsString()
  type: StepType;

  @IsString()
  content: string;
}
