import { Injectable } from '@nestjs/common';
import { Task } from './task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/course/course.schema';
import { User } from 'src/auth/schemas/user.schema';
import { TaskDto } from './task.dto';
import { Notification } from 'src/notification/notification.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Notification.name)
    private notificationModel: Model<Task>,
  ) {}

  async createTask(
    taskDto: TaskDto,
    courseCode: string,
    username: string,
  ): Promise<Task> {
    console.log('courseCode: ', courseCode);
    const course = await this.courseModel.findOne({ courseCode: courseCode });
    const currentUser = await this.userModel.findOne({ username: username });
    if (!currentUser) {
      throw new Error('userNotFound');
    }
    console.log('current user is: ', currentUser);
    console.log('course is: ', course);

    if (!course) {
      throw new Error('courseNotFound');
    }
    console.log(taskDto);
    const task = new this.taskModel(taskDto);
    await task.save();
    course.tasks.push(task._id);
    currentUser.tasks.push(task._id);
    await currentUser.save();
    await course.save();
    this.notificationModel.create({
      message: `New task ${task.title} has been created`,
      time: new Date().toISOString(),
    });

    return task;
  }

  async getTask(username: string): Promise<Task[]> {
    const currentUser = await this.userModel.findOne({ username: username });
    if (!currentUser) {
      throw new Error('userNotFound');
    }
    const tasks = [];
    for (let task of currentUser.tasks) {
      tasks.push(await this.taskModel.findOne({ _id: task }));
    }
    if (!tasks) {
      throw new Error('No tasks found');
    }
    return tasks;
  }

  async getCourseTask(courseCode: string, username: string): Promise<any> {
    const currentUser = await this.userModel.findOne({ username: username });
    if (!currentUser) {
      throw new Error('userNotFound');
    }
    const courses = currentUser.courses;
    const courseList = [];
    for (const courseId of courses) {
      const course = await this.courseModel.findOne({ _id: courseId });
      courseList.push(course);
    }
    const currnentCourse = courseList.find((course) => {
      return course.courseCode === courseCode;
    });
    if (!currnentCourse) {
      return [];
    }
    const tasks = [];
    for (let task of currnentCourse.tasks) {
      tasks.push(await this.taskModel.findOne({ _id: task }));
    }
    return tasks;
  }
}
