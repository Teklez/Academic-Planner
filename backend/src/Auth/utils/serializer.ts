import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
@Injectable()
export class SessionSerialiser extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    console.log('Serialize User');
    done(null, user);
  }

  async deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): Promise<any> {
    const user = await this.authService.findUser(payload.email);
    console.log('Deserialize User');
    console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}
