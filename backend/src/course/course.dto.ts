import { Task } from '../task/task.schema';
export class CourseDto {
  courseName: string;
  instructor: string;
  courseCode: string;
  startDate: string;
  endDate: string;
  ECTS: number;
}
