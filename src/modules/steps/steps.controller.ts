import {
  Body,
  Controller,
  Delete,
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
import { JwtGuard } from 'src/modules/auth/guard/jwt.guard';
import { TestService } from './test.service';

@UseGuards(JwtGuard)
@Controller('steps')
@ApiTags('steps')
export class StepsController {
  constructor(
    private stepsService: StepsService,
    private testService: TestService,
  ) {}

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
  createStep(@Body() dto: CreateStepDto) {
    return this.stepsService.createStep(dto);
  }

  @ApiCreatedResponse({
    description: 'Создание ответа',
    type: CreateStepDto,
  })
  @Post(':stepId/test/answer')
  createAnswer(@Body() dto: CreateAnswerDto) {
    return this.testService.createAnswer(dto);
  }

  @ApiCreatedResponse({
    description: 'Изменение ответа',
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

  @ApiCreatedResponse({
    description: 'Удаление ответа',
    type: ChangeAnswerDto,
  })
  @Delete(':stepId/test/answer/:answerId')
  deleteAnswer(
    @Param('answerId', ParseIntPipe) answerId: number,
  ) {
    return this.testService.deleteAnswer(answerId);
  }
}
