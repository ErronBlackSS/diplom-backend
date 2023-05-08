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
