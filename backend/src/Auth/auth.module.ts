import { Module, Session } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserSchema } from './schemas/user.schema';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { SessionSerialiser } from './utils/serializer';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),

    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: AuthGuard },
    GoogleStrategy,
    SessionSerialiser,
  ],
})
export class AuthModule {}
