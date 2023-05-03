import {
  UseGuards,
  Controller,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/modules/auth/guard/jwt.guard';
import { UserInfo } from 'src/modules/user/user';
import { CreateModuleDto } from './dto/module.dto';
import { ModulesService } from './module.service';
import { Module } from './modules';

@UseGuards(JwtGuard)
@Controller('/courses/:courseId/module')
@ApiTags('module')
export class ModulesController {
  constructor(private modulesService: ModulesService) {}

  @ApiCreatedResponse({
    description: 'Создание модуля',
    type: CreateModuleDto,
  })
  @Post()
  createModule(
    @GetUser() user: UserInfo,
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() dto: CreateModuleDto,
  ): Promise<Module> {
    return this.modulesService.createModule(
      user,
      dto,
      courseId,
    );
  }
}
