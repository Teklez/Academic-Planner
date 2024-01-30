import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

// This is the schema definition for the User model.
@Schema({
  timestamps: true,
})
export class Task {
  @Prop({ required: true })
  title: string;
  @Prop({ unique: true })
  description: string;
  @Prop()
  dueDate: Date;
  @Prop()
  priority: string;
  @Prop()
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
