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
import { User } from '../Auth/schemas/user.schema';
import { Notification } from '../notification/notification.schema';
import { NotificationDto } from '../notification/notification.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}

  async deleteAllCourse(username: string): Promise<any> {
    const currentUser = await this.userModel.findOne({ username: username });
    if (!currentUser) {
      throw new NotFoundException('userNotFound');
    }
    const notification = new this.notificationModel({
      message: `All courses have been deleted`,
      time: new Date().toISOString(),
    });
    console.log('courses deleted');
    await notification.save();
    currentUser.notifications.push(notification._id);
    currentUser.courses = [];
    await currentUser.save();
    return { message: 'allCoursesDeleted' };
  }

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
    console.log('courseCode is: ', courseCode);
    console.log('courseDto is: ', courseDto.courseCode);
    // console.log('username is: ', username);
    // console.log(courseCode);
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

    const notificationDto = new NotificationDto();
    notificationDto.message = `New course ${course.courseName} has been created`;
    notificationDto.time = new Date().toISOString();
    const notification = new this.notificationModel(notificationDto);
    await notification.save();
    console.log(notification);
    currentUser.notifications.push(notification._id);
    await currentUser.save();
    return course;
  }
}
