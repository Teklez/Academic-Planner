import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('user/:username/notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getNotification(): Promise<any> {
    return this.notificationService.getNotification();
  }
}
