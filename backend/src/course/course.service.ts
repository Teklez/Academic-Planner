import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CourseSchema } from './course.schema';
import { Model } from 'mongoose';
import { Course } from './course.schema';
import { CourseDto } from './course.dto';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getCourse(): Promise<any> {
    return await this.courseModel.find();
  }

  async createCourse(courseDto: CourseDto): Promise<Course> {
    const courseCode = this.courseModel.findOne({
      courseCode: courseDto.courseCode,
    });
    if (courseCode) {
      throw new NotFoundException('Course code already exists');
    }
    const course = new this.courseModel(courseDto);
    return await course.save();
  }
}
