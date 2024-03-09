import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../Auth/schemas/user.schema';
import { Notification } from '../notification/notification.schema';
import { NotificationModule } from './notification.module';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}
  async getNotification(username: string): Promise<any> {
    const currentUser = await this.userModel.findOne({ username: username });
    if (!currentUser) {
      throw new Error('userNotFound');
    }
    const notifications = currentUser.notifications;
    const notificationList = [];
    for (const notificationId of notifications) {
      const notification = await this.notificationModel.findOne({
        _id: notificationId,
      });
      notificationList.push(notification);
    }
    return notificationList;
  }
  async deleteAllNotification(username: string): Promise<any> {
    const currentUser = await this.userModel.findOne({ username: username });
    if (!currentUser) {
      throw new Error('userNotFound');
    }
    currentUser.notifications = [];
    await currentUser.save();
    return { message: 'allNotificationsDeleted' };
  }
}
