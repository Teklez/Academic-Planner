import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async careatUser(
    @Body('firstname') firstN: string,
    @Body('lastname') lastN: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.userService.addNewUser(firstN, lastN, email, password);
  }

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getSingleUser(@Param('id') userId: string) {
    return await this.userService.getSingleUser(userId);
  }
}
