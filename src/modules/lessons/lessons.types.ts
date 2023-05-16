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

export type Step = {
  id: number;
  type: StepType;
};

export enum StepType {
  TEXT,
  TEST,
}

export type LessonWithSteps = Lesson & { steps: Step[] };
