import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CourseSchema } from './course.schema';
import { Model } from 'mongoose';
import { Course } from './course.schema';
import { CourseDto } from './course.dto';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async getCourse(username: string): Promise<any> {
    const currentUser = await this.userModel.findOne({ username: username });
    if (!currentUser) {
      throw new NotFoundException('userNotFound');
    }
    const courses = currentUser.courses;
    const courseList = [];
    for (const courseId of courses) {
      const course = await this.courseModel.findOne({ _id: courseId });
      courseList.push(course);
    }
    return courseList;
  }

  async createCourse(courseDto: CourseDto, username: string): Promise<Course> {
    const courseCode = await this.courseModel.findOne({
      courseCode: courseDto.courseCode,
    });
    console.log('username is: ', username);
    console.log(courseCode);
    if (courseCode) {
      throw new HttpException('coursAlreadyExist', HttpStatus.CONFLICT);
    }
    const course = new this.courseModel(courseDto);
    await course.save();
    const currentUser = await this.userModel.findOne({ username: username });
    if (!currentUser) {
      console.log('user not found');
      throw new NotFoundException('userNotFound at createCourse');
    }
    console.log(currentUser);
    console.log(course);
    currentUser.courses.push(course._id);

    await currentUser.save();
    return course;
  }
}
