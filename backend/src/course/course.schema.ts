import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Task } from 'src/task/task.schema';

// This is the schema definition for the User model.
@Schema({
  timestamps: true,
})
export class Course {
  @Prop({ required: true })
  courseName: string;
  @Prop({ unique: true })
  courseCode: string;
  @Prop()
  instructor: string;
  @Prop()
  startDate: string;
  @Prop()
  endDate: string;
  @Prop()
  tasks: [{ type: mongoose.Schema.Types.ObjectId; ref: 'Task' }];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
