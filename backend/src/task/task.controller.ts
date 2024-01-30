import { Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';
import { Task } from './task.schema';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get('/get')
  getTask(): Promise<Task[]> {
    return this.taskService.getTask();
  }

  @Post('/create')
  createTask(taskDto: TaskDto): Promise<Task> {
    return this.taskService.createTask();
  }
}
