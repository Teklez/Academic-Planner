import {
  Controller,
  Get,
  Post,
  HttpStatus,
  HttpCode,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './course.dto';
import { Course } from './course.schema';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async createCourse(
    @Body(ValidationPipe) courseDto: CourseDto,
  ): Promise<Course> {
    return await this.courseService.createCourse(courseDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/get')
  async getCourse(): Promise<Course> {
    return await this.courseService.getCourse();
  }
}
