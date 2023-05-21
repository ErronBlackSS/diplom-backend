import {
  UseGuards,
  Controller,
  Body,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Get,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/modules/auth/guard/jwt.guard';
import { LessonsService } from './lessons.service';
import {
  changeLessonOrderDto,
  CreateLessonDto,
  ModuleLessonsWithSteps,
} from './dto/lessons.dto';
import { Lesson } from './lessons.types';
import { ModuleOwnerGuard } from '../modules/guard/module-owner.guard';
import { LessonOwnerGuard } from './guard/lesson-owner.guard';

@UseGuards(JwtGuard)
@Controller('lessons')
@ApiTags('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @ApiCreatedResponse({
    description: 'Создание урока',
    type: CreateLessonDto,
  })
  @Post('create')
  createLesson(
    @Body() dto: CreateLessonDto,
  ): Promise<Lesson> {
    return this.lessonsService.createLesson(dto);
  }

  @UseGuards(LessonOwnerGuard)
  @ApiCreatedResponse({
    description: 'Изменение порядкого номера урока',
    type: changeLessonOrderDto,
  })
  @Patch(':lessonId/order')
  changeLessonOrder(
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @Body() dto: changeLessonOrderDto,
  ): Promise<Lesson> {
    return this.lessonsService.changeLessonOrder(
      lessonId,
      dto,
    );
  }

  @UseGuards(LessonOwnerGuard)
  @ApiCreatedResponse({
    description: 'Удаление урока',
  })
  @Delete(':lessonId/delete')
  deleteLesson(
    @Param('lessonId', ParseIntPipe) lessonId: number,
  ) {
    return this.lessonsService.deleteLesson(lessonId);
  }

  @UseGuards(ModuleOwnerGuard)
  @ApiCreatedResponse({
    description:
      'Получение уроков модуля для редактирования',
    type: ModuleLessonsWithSteps,
  })
  @Get(':moduleId/with-steps')
  getModuleLessons(
    @Param('moduleId', ParseIntPipe) moduleId: number,
  ): Promise<ModuleLessonsWithSteps> {
    return this.lessonsService.getModuleLessons(moduleId);
  }
}
