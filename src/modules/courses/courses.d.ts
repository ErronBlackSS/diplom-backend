import { Course } from '@prisma/client';
import { Module } from '../modules/modules';

export type PrismaCourse = Course & {
  CourseImage: { path: string };
};

export type ExposedCourse = {
  id: number;
  name: string;
  dateCreate: Date;
  creatorId: number;
  published: boolean;
  promo: string | null;
  imagePath: string;
};

export type CourseContent = {
  course: ExposedCourse;
  modules: Module[];
};

export interface CourseChecklist {
  enoughModules: number;
  moduleNames: boolean;
  enoughLessons: number;
  enoughTests: number;
  testEnoughAnswers: boolean;
  testRightAnswers: boolean;
  emptyModules: boolean;
  enoughSteps: boolean;
  stepsEmptyContent: boolean;
}
