import { Module } from '@nestjs/common';
import { StepsController } from './steps.controller';
import { StepsService } from './steps.service';
import { TestService } from './test.service';

@Module({
  controllers: [StepsController],
  providers: [StepsService, TestService],
})
export class StepsModule {}
