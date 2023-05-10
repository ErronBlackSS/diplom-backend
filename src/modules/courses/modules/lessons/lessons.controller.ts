import {
  UseGuards,
  Controller,
  Body,
  Param,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserInfo } from 'src/modules/user/user';
import { GetUser } from 'src/modules/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/modules/auth/guard/jwt.guard';
import { LessonsService } from './lessons.service';
import {
  changeLessonOrderDto,
  CreateLessonDto,
} from './dto/lessons.dto';
import { Lesson } from './lessons';

@UseGuards(JwtGuard)
@Controller('/modules/:moduleId/lessons')
@ApiTags('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}

  @ApiCreatedResponse({
    description: 'Создание урока',
    type: CreateLessonDto,
  })
  @Post()
  createLesson(
    @Param('moduleId', ParseIntPipe) moduleId: number,
    @Body() dto: CreateLessonDto,
  ): Promise<Lesson> {
    return this.lessonsService.createLesson(dto, moduleId);
  }

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
}
