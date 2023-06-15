import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
