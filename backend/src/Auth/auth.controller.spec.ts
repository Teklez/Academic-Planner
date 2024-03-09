import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User, UserSchema } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';
import { Public } from './decorator/public.decorator';
import { GoogleAuthGuard } from './guards/google.guards';
import { Course, CourseSchema } from '../course/course.schema';
import {
  Notification,
  NotificationSchema,
} from '../notification/notification.schema';
import { Task, TaskSchema } from '../task/task.schema';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      providers: [AuthService, JwtService, GoogleAuthGuard],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('logIn', () => {
    it('should return an access token', async () => {
      const mockLoginDto: LoginDto = {
        username: 'testUser',
        password: 'testPassword',
      };

      jest
        .spyOn(authService, 'logIn')
        .mockImplementation(async () => ({ access_token: 'mockAccessToken' }));

      const result = await controller.logIn(mockLoginDto);

      expect(result).toEqual({ access_token: 'mockAccessToken' });
    });
  });

  describe('signup', () => {
    it('should create a new user and return it', async () => {
      const mockSignUpDto: SignUpDto = {
        email: 'test@example.com',
        username: 'testUser',
        password: 'testPassword',
      };

      jest
        .spyOn(authService, 'singUP')
        .mockImplementation(async () => ({ ...mockSignUpDto }) as User);

      const result = await controller.signup(mockSignUpDto);

      expect(result).toEqual({ ...mockSignUpDto } as User);
    });
  });

  // Add more test cases for other controller methods as needed

  describe('googleAuth', () => {
    it('should log "Google Auth"', async () => {
      const consoleSpy = jest.spyOn(console, 'log');
      await controller.googleAuth();
      expect(consoleSpy).toHaveBeenCalledWith('Google Auth');
    });
  });

  // Add more test cases for other controller methods as needed

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
