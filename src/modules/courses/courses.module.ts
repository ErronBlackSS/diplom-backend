import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { LessonsController } from '../lessons/lessons.controller';
import { LessonsService } from '../lessons/lessons.service';
import { ModulesController } from '../modules/module.controller';
import { ModulesService } from '../modules/module.service';

@Module({
  controllers: [
    CoursesController,
    ModulesController,
    LessonsController,
  ],
  providers: [
    CoursesService,
    ModulesService,
    LessonsService,
  ],
})
export class CoursesModule {}
