import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { StepsController } from './steps/steps.controller';
import { StepsService } from './steps/steps.service';
import { TestService } from './steps/test.service';

@Module({
  controllers: [LessonsController, StepsController],
  providers: [LessonsService, StepsService, TestService],
})
export class LessonsModule {}
