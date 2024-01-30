import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UseGuards,
  Redirect,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

import { Public } from './decorator/public.decorator';
import { SignUpDto } from './dto/signUp.dto';
import { User } from './schemas/user.schema';
import { GoogleAuthGuard } from './guards/google.guards';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // login endpoint
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  logIn(@Body() loginDto: LoginDto) {
    return this.authService.logIn(loginDto.username, loginDto.password);
  }

  //   signup endpoint

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signup(@Body(ValidationPipe) signupDto: SignUpDto): Promise<User> {
    console.log(process.env.JWT_EXPIRES);
    return await this.authService.singUP(signupDto);
  }

  //   google auth endpoint
  @Public()
  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    console.log('Google Auth');
  }

  //   google auth callback endpoint

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Redirect('../../../frontend/dashboard.html', 301)
  @Get('/google/callback')
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // return Redirect('../../../frontend/dashboard.html');
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    console.log(req.cookies);
    return req.user;
  }
}
