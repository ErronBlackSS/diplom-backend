import { Step } from './steps/steps';

export enum LESSON_TYPES {
  PROG,
  TEST,
  TEXT,
}

export type Lesson = {
  id: number;
  moduleId: number;
  name: string;
  order: number;
};

export type LessonWithSteps = Lesson & { steps: Step[] };
