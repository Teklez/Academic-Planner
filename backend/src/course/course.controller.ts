import {
  Controller,
  Get,
  Post,
  HttpStatus,
  HttpCode,
  Body,
  ValidationPipe,
  Req,
  HttpException,
  Param,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './course.dto';
import { Course } from './course.schema';
import { Public } from 'src/auth/decorator/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Controller('user/:username/course')
export class CourseController {
  jwtService: JwtService;
  constructor(private readonly courseService: CourseService) {}
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  async createCourse(
    @Body(ValidationPipe) courseDto: CourseDto,
    @Param('username') username: string,
  ): Promise<Course> {
    // const access_token = req.access_token;
    // if (!access_token) {
    //   throw new HttpException('tokenNotFound', HttpStatus.UNAUTHORIZED);
    // }
    // const decodedToken = this.jwtService.verify(access_token);
    // console.log('Decoded Token:', decodedToken);
    // const username = decodedToken.username;
    // if (!username) {
    //   throw new HttpException('usernameNotFound', HttpStatus.UNAUTHORIZED);
    // }
    // console.log('Access Token:', access_token);

    return await this.courseService.createCourse(courseDto, username);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getCourse(@Param('username') username: string): Promise<Course> {
    // const access_token = req.access_token;
    // if (!access_token) {
    //   throw new HttpException('tokenNotFound', HttpStatus.UNAUTHORIZED);
    // }
    // const decodedToken = this.jwtService.verify(access_token);
    // console.log('Decoded Token:', decodedToken);
    // const username = decodedToken.username;
    // if (!username) {
    //   throw new HttpException('usernameNotFound', HttpStatus.UNAUTHORIZED);
    // }
    // console.log('Access Token:', access_token);
    return await this.courseService.getCourse(username);
  }
}
