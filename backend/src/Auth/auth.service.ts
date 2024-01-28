import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // VALIDATE USER

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

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException();
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
