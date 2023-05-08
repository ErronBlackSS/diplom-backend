import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { LessonsController } from './modules/lessons/lessons.controller';
import { LessonsService } from './modules/lessons/lessons.service';
import { ModulesController } from './modules/module.controller';
import { ModulesService } from './modules/module.service';

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
