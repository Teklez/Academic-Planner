import { Injectable } from '@nestjs/common';
import { Task } from './task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/course/course.schema';
import { User } from 'src/auth/schemas/user.schema';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createTask(
    taskDto: TaskDto,
    courseCode: string,
    username: string,
  ): Promise<Task> {
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

  async getCourseTask(courseCode: string): Promise<any> {
    const course = await this.courseModel.findOne({ courseCode: courseCode });
    if (!course) {
      throw new Error('courseNotFound');
    }
    const tasks = [];
    for (let task of course.tasks) {
      tasks.push(await this.taskModel.findOne({ _id: task }));
    }
    return tasks;
  }
}
