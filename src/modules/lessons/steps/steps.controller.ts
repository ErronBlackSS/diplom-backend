import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateStepDto } from './dto/steps.dto';
import { StepsService } from './steps.service';

@Controller(':lessonId/steps')
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
