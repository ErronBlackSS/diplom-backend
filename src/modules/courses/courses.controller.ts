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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserInfo } from '../user/user.types';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import {
  CourseChecklist,
  CourseContent,
  ExposedCourse,
} from './courses';
import { CoursesService } from './courses.service';
import {
  CreateCourseDto,
  ChangeCourseDto,
  ChangeCourseImageDto,
} from './dto/courses.dto';
import { CourseOwnerGuard } from 'src/modules/courses/guard/course-owner.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'multer.config';

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
  getUserOwnerCourses(
    @GetUser() user: UserInfo,
  ): Promise<ExposedCourse[]> {
    return this.coursesService.getUserOwnerCourses(user);
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

  @UseGuards(CourseOwnerGuard)
  @ApiCreatedResponse({
    description: 'Удаление курса',
    type: CreateCourseDto,
  })
  @Delete(':courseId')
  deleteCourse(
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.coursesService.deleteCourse(courseId);
  }

  @UseGuards(CourseOwnerGuard)
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

  @UseGuards(CourseOwnerGuard)
  @ApiCreatedResponse({
    description: 'Чтение чеклиста курса',
    type: CreateCourseDto,
  })
  @Get(':courseId/checklist')
  getCourseChecklist(
    @Param('courseId', ParseIntPipe) courseId: number,
  ): Promise<CourseChecklist> {
    return this.coursesService.getCourseChecklist(courseId);
  }

  @UseGuards(CourseOwnerGuard)
  @ApiCreatedResponse({
    description: 'Изменение курса',
    type: ChangeCourseDto,
  })
  @Patch(':courseId/update')
  changeModuleName(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() dto: ChangeCourseDto,
  ): Promise<ExposedCourse> {
    return this.coursesService.changeCourse(courseId, dto);
  }

  @UseGuards(CourseOwnerGuard)
  @ApiCreatedResponse({
    description: 'Изменение картинки курса',
    type: ChangeCourseImageDto,
  })
  @Post(':courseId/image')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  changeCourseImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.coursesService.changeImage(courseId, file);
  }

  @ApiCreatedResponse({
    description: 'Запись пользователя на курс',
    type: ChangeCourseImageDto,
  })
  @Post(':courseId/book')
  bookUserOnCourse(
    @Param('courseId', ParseIntPipe) courseId: number,
    @GetUser() user: UserInfo,
  ) {
    return this.coursesService.bookOnCourse(
      courseId,
      user.userId,
    );
  }

  @ApiCreatedResponse({
    description:
      'Чтение курсов на которые записан пользователь',
    type: ChangeCourseImageDto,
  })
  @Get('userCourses')
  getUserCourses(@GetUser() user: UserInfo) {
    return this.coursesService.getUserCourses(user);
  }
}
