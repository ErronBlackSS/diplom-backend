import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { StepsController } from './steps/steps.controller';
import { StepsService } from './steps/steps.service';

@Module({
  controllers: [LessonsController, StepsController],
  providers: [LessonsService, StepsService],
})
export class LessonsModule {}
