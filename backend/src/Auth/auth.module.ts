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
import { CourseSchema } from 'src/course/course.schema';
import { NotificationSchema } from 'src/notification/notification.schema';
import { TaskSchema } from 'src/task/task.schema';

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
      {
        name: 'Course',
        schema: CourseSchema,
      },
      {
        name: 'Notification',
        schema: NotificationSchema,
      },
      {
        name: 'Task',
        schema: TaskSchema,
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
