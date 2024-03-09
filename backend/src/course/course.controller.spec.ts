import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseDto } from './course.dto';
import { Course } from './course.schema';
import { NotFoundException } from '@nestjs/common';

describe('CourseController', () => {
  let controller: CourseController;
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [CourseService],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });

  describe('createCourse', () => {
    it('should create a new course', async () => {
      const mockCourseDto: CourseDto = {
        courseCode: 'CS101',
        courseName: 'Introduction to Computer Science',
        ECTS: 5,
        instructor: 'John Doe',
        startDate: '1/2/2024',
        endDate: '1/2/2025',
      };

      const mockUsername = 'testUser';

      jest
        .spyOn(service, 'createCourse')
        .mockImplementation(async () => ({ ...mockCourseDto }) as Course);

      const result = await controller.createCourse(mockCourseDto, mockUsername);

      expect(result).toEqual({ ...mockCourseDto } as Course);
    });
  });

  describe('getCourse', () => {
    it('should get the courses for a user', async () => {
      const mockUsername = 'testUser';

      const mockCourses: Course[] = [
        {
          courseCode: 'CS101',
          courseName: 'Introduction to Computer Science',
          ECTS: 5,
          startDate: '1/2/2024',
          endDate: '1/2/2025',
          instructor: 'John Doe',
          tasks: [],
        },
        {
          courseCode: 'CS102',
          courseName: 'Data Structures',
          ECTS: 5,
          startDate: '1/2/2024',
          endDate: '1/2/2025',
          instructor: 'John Doe',
          tasks: [],
        },
      ];

      jest
        .spyOn(service, 'getCourse')
        .mockImplementation(async () => mockCourses);

      const result = await controller.getCourse(mockUsername);

      expect(result).toEqual(mockCourses);
    });
  });

  describe('deleteAllCourse', () => {
    it('should delete all courses for a user', async () => {
      const mockUsername = 'testUser';

      jest
        .spyOn(service, 'deleteAllCourse')
        .mockImplementation(async () => ({ message: 'allCoursesDeleted' }));

      const result = await controller.deleteAllCourse(mockUsername);

      expect(result).toEqual({ message: 'allCoursesDeleted' });
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
