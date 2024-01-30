import { Injectable } from '@nestjs/common';
import { Task } from './task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/course/course.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
    @InjectModel(Course.name)
    private userModel: Model<Course>,
  ) {}
  async createTask(): Promise<Task> {
    const task = new this.taskModel();
    return await task.save();
  }
  async getTask(): Promise<Task[]> {
    const tasks = await this.taskModel.find();
    if (!tasks) {
      throw new Error('No tasks found');
    }
    return tasks;
  }
}
