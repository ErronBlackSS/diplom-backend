import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CatalogService } from './catalog.service';

@Controller('catalog')
@ApiTags('catalog')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  @ApiCreatedResponse({
    description: 'Чтение каталога',
  })
  @Get()
  getCatalog() {
    return this.catalogService.getCatalog();
  }

  @ApiCreatedResponse({
    description: 'Чтение промо курса',
  })
  @Get(':courseId/promo')
  getPromo(
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.catalogService.getCoursePromo(courseId);
  }
}
