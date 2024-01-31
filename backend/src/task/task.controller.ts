import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';
import { Task } from './task.schema';

@Controller('user/:username')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get('course/:courseCode/task')
  getCourseTask(
    @Param('courseCode') courseCode: string,
    @Param('username') username: string,
  ): Promise<any> {
    return this.taskService.getCourseTask(courseCode, username);
  }

  @Get('/task')
  getTask(@Param('username') username: string): Promise<any> {
    return this.taskService.getTask(username);
  }

  @Post('course/:courseCode/task/create')
  createTask(
    @Body() taskDto: TaskDto,
    @Param('courseCode') courseCode: string,
    @Param('username') username: string,
  ): Promise<Task> {
    return this.taskService.createTask(taskDto, courseCode, username);
  }
}
