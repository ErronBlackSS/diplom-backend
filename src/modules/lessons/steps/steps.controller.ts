import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateStepDto } from './dto/steps.dto';
import { StepsService } from './steps.service';
import { LessonOwnerGuard } from '../guard/lesson-owner.guard';
import { JwtGuard } from 'src/modules/auth/guard/jwt.guard';

@UseGuards(JwtGuard, LessonOwnerGuard)
@Controller('lessons/:lessonId/steps')
@ApiTags('steps')
export class StepsController {
  constructor(private stepsService: StepsService) {}

  @ApiCreatedResponse({
    description: 'Чтение шагов урока',
    type: CreateStepDto,
  })
  @Get()
  getLessonSteps(
    @Param('lessonId', ParseIntPipe) lessonId: number,
  ) {
    return this.stepsService.getLessonSteps(lessonId);
  }

  @ApiCreatedResponse({
    description: 'Чтение шагa',
    type: CreateStepDto,
  })
  @Get(':stepId')
  getStep(@Param('stepId', ParseIntPipe) stepId: number) {
    return this.stepsService.getStep(stepId);
  }

  @ApiCreatedResponse({
    description: 'Создание шага',
    type: CreateStepDto,
  })
  @Post()
  createStep(
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @Body() dto: CreateStepDto,
  ) {
    return this.stepsService.createStep(lessonId, dto);
  }
}
