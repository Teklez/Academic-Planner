import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { error } from 'console';
import { Course } from '../course/course.schema';
import { Notification } from '../notification/notification.schema';
import { NotificationDto } from '../notification/notification.dto';
import { Task } from '../task/task.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Course.name)
    private courseModel: Model<Course>,
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
    private jwtService: JwtService,
  ) {}

  // VALIDATE USER

  async deleteAccount(username: string): Promise<any> {
    const currentUser = await this.userModel.findOne({
      username: username,
    });
    if (!currentUser) {
      throw new HttpException('userNotFound', HttpStatus.NOT_FOUND);
    }

    const courses = currentUser.courses;
    const notifications = currentUser.notifications;
    const tasks = currentUser.tasks;

    for (const courseId of courses) {
      await this.courseModel.deleteOne({ _id: courseId });
    }

    for (const notificationId of notifications) {
      await this.notificationModel.deleteOne({ _id: notificationId });
    }

    for (const taskId of tasks) {
      await this.taskModel.deleteOne({ _id: taskId });
    }
    await this.userModel.deleteOne({ username: username });
    return { message: 'userDeleted' };
  }

  async validateUser(email: string, displayname: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });
    if (user) return user;
    console.log("user doesn't exist");
    const newUser = new this.userModel({
      email: email,
      username: displayname,
    });
    await newUser.save();
    console.log(newUser);
    return newUser || null;
  }

  // find user

  async findUser(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });
    if (user) return user;
    return null;
  }

  // login service

  async logIn(username: string, pass: string): Promise<any> {
    const user = await this.userModel
      .findOne({ username: username })
      .lean()
      .exec();
    if (!user) {
      console.log('user not found');
      throw new HttpException('userNotFound', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      console.log('incorrect password');
      throw new HttpException('incorrectPassword', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user['_id'], username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES,
      }),
    };
  }

  //google login service

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    return {
      message: 'User Info from Google',
      user: req.user,
    };
  }

  //   signup service

  async singUP(signupDto: SignUpDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(signupDto.password, salt);
    signupDto.password = hashedPassword;
    const user = new this.userModel(signupDto);
    return await user.save();
  }
}
