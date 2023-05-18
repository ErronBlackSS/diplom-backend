import { StepType } from '@prisma/client';

export type Step = {
  id: number;
  type: StepType;
};
