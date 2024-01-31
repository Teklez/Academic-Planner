import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

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
}
