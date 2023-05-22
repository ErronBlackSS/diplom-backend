export enum LESSON_TYPES {
  PROG,
  TEST,
  TEXT,
}

export type Lesson = {
  id: number;
  name: string;
  order: number;
};

export type ExposedModule = {
  id: number;
  name: string;
};

export type ModulesWithLessons = ExposedModule & {
  lessons: Lesson[];
};
