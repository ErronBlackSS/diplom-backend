import {
  Controller,
  Get,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { join } from 'path';
import { Response } from 'express';
import { readFile } from 'fs/promises';

@Controller('uploads')
@ApiTags('uploads')
export class FilesController {
  constructor(
    private fileService: FilesService,
    private config: ConfigService,
  ) {}
  @Get(':key')
  async getImageFile(
    @Param() params,
    @Res({ passthrough: true }) res: Response,
  ) {
    const fileData = await readFile(
      join(`${process.cwd()}/uploads/${params.key}`),
    );

    res.set('Content-Disposition', 'inline');
    res.set('Content-Type', 'image/png');

    return new StreamableFile(<Buffer>fileData);
  }
}
