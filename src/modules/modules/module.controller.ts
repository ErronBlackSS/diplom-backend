import {
  UseGuards,
  Controller,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/modules/auth/guard/jwt.guard';
import {
  changeModuleDto,
  CreateModuleDto,
} from './dto/module.dto';
import { ModulesService } from './module.service';
import { Module } from './modules';

@UseGuards(JwtGuard)
@Controller('modules')
@ApiTags('modules')
export class ModulesController {
  constructor(private modulesService: ModulesService) {}

  @ApiCreatedResponse({
    description: 'Создание модуля',
    type: CreateModuleDto,
  })
  @Post('create')
  createModule(
    @Body() dto: CreateModuleDto,
  ): Promise<Module> {
    return this.modulesService.createModule(dto);
  }

  @ApiCreatedResponse({
    description: 'Изменение модуля',
    type: changeModuleDto,
  })
  @Patch(':moduleId/update')
  changeModuleName(
    @Param('moduleId', ParseIntPipe) moduleId: number,
    @Body() dto: changeModuleDto,
  ): Promise<Module> {
    return this.modulesService.changeModule(moduleId, dto);
  }
}
