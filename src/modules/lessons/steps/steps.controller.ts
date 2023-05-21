import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ChangeAnswerDto,
  CreateAnswerDto,
  CreateStepDto,
  UpdateStepContentDto,
} from './dto/steps.dto';
import { StepsService } from './steps.service';
import { LessonOwnerGuard } from '../guard/lesson-owner.guard';
import { JwtGuard } from 'src/modules/auth/guard/jwt.guard';
import { TestService } from './test.service';

@UseGuards(JwtGuard, LessonOwnerGuard)
@Controller('lessons/:lessonId/steps')
@ApiTags('steps')
export class StepsController {
  constructor(
    private stepsService: StepsService,
    private testService: TestService,
  ) {}

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
    description: 'Обновление контента шага',
    type: UpdateStepContentDto,
  })
  @Patch(':stepId/content')
  updateStepContent(
    @Param('stepId', ParseIntPipe) stepId: number,
    @Body() dto: UpdateStepContentDto,
  ) {
    return this.stepsService.updateStepContent(stepId, dto);
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

  @ApiCreatedResponse({
    description: 'Создание шага',
    type: CreateStepDto,
  })
  @Post(':stepId/test/answer')
  createAnswer(@Body() dto: CreateAnswerDto) {
    return this.testService.createAnswer(dto);
  }

  @ApiCreatedResponse({
    description: 'Создание шага',
    type: ChangeAnswerDto,
  })
  @Patch(':stepId/test/answer/:answerId')
  changeAnswer(
    @Param('answerId', ParseIntPipe) answerId: number,
    @Body()
    dto: ChangeAnswerDto,
  ) {
    return this.testService.сhangeAnswer(answerId, dto);
  }
}
