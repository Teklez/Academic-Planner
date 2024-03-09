import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserModule } from './user/user.module';
// import { UserService } from './user/user.service';
// import { UserController } from './user/user.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './auth/schemas/user.schema';
import { CourseSchema } from './course/course.schema';
import { TaskSchema } from './task/task.schema';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CourseController } from './course/course.controller';
import { CourseService } from './course/course.service';
import { CourseModule } from './course/course.module';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';
import { AuthMiddleware } from './Auth/auth.middleware';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { NotificationSchema } from './notification/notification.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PassportModule.register({ session: true }),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Course', schema: CourseSchema },
      { name: 'Task', schema: TaskSchema },
      { name: 'Notification', schema: NotificationSchema },
    ]),
    AuthModule,
    CourseModule,
    TaskModule,
    NotificationModule,
  ],
  controllers: [
    AppController,
    AuthController,
    CourseController,
    TaskController,
    NotificationController,
  ],
  providers: [
    AppService,
    AuthService,
    JwtService,
    CourseService,
    TaskService,
    NotificationService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
