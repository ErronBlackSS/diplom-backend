import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { ModulesController } from './modules/module.controller';
import { ModulesService } from './modules/module.service';

@Module({
  controllers: [CoursesController, ModulesController],
  providers: [CoursesService, ModulesService],
})
export class CoursesModule {}
