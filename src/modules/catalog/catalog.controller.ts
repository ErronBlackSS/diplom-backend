import { Controller, Get } from '@nestjs/common';
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
}
