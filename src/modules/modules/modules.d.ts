import { ModuleLesson } from '@prisma/client';

export type Module = {
  id: number;
  courseId: number;
  name: string;
  description: string;
  order: number;
  lessons: Lesson[];
};

export type PrismaCourseModule = CourseModule & {
  lessons: ModuleLesson[];
};
