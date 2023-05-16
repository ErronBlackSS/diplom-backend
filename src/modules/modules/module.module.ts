import { Module } from '@nestjs/common';
import { ModulesController } from './module.controller';
import { ModulesService } from './module.service';

@Module({
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}
