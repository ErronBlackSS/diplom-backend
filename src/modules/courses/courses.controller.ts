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
import { UserInfo } from '../user/user';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CourseContent, ExposedCourse } from './courses';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/courses.dto';

@UseGuards(JwtGuard)
@Controller('courses')
@ApiTags('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @ApiCreatedResponse({
    description: 'Чтение курсов созданных пользователем',
    type: CreateCourseDto,
  })
  @Get()
  getUserCourses(
    @GetUser() user: UserInfo,
  ): Promise<ExposedCourse[]> {
    return this.coursesService.getUserCourses(user);
  }

  @ApiCreatedResponse({
    description: 'Создание курса',
    type: CreateCourseDto,
  })
  @Post()
  createCourse(
    @Body() data: CreateCourseDto,
    @GetUser() user: UserInfo,
  ): Promise<ExposedCourse> {
    return this.coursesService.createCourse(user, data);
  }

  @ApiCreatedResponse({
    description: 'Чтение контента курса',
    type: CreateCourseDto,
  })
  @Get(':courseId/content')
  getCourseContent(
    @Param('courseId', ParseIntPipe) courseId: number,
  ): Promise<CourseContent> {
    return this.coursesService.getCourseContent(courseId);
  }
}
