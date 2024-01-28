import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  async addNewUser(
    firstN: string,
    lastN: string,
    email: string,
    password: string,
  ) {
    // if user is already in the system

    // if user is not in the system
    const newUser = new this.userModel({
      firstname: firstN,
      lastname: lastN,
      email: email,
      password: password,
    });
    await newUser.save();
    console.log(newUser);
  }

  async findAll() {
    const allUsers = await this.userModel.find().exec();
    console.log(allUsers);
  }

  async getSingleUser(userId: string) {
    const singleUser = await this.userModel.findById(userId);
  }
}
