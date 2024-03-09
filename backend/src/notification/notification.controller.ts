import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('user/:username/notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  async getNotification(@Param('username') username: string): Promise<any> {
    return this.notificationService.getNotification(username);
  }
  @HttpCode(HttpStatus.OK)
  @Delete('/delete')
  async deleteAllNotification(
    @Param('username') username: string,
  ): Promise<any> {
    return this.notificationService.deleteAllNotification(username);
  }
}
