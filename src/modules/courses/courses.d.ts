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
