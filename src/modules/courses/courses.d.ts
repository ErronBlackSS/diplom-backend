import { Module } from '../modules/modules';

export type ExposedCourse = {
  id: number;
  name: string;
  dateCreate: Date;
  creatorId: number;
};

export type CourseContent = {
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
