import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

// This is the schema definition for the User model.
@Schema({
  timestamps: true,
})
export class User extends mongoose.Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] })
  courses: mongoose.Types.ObjectId[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: mongoose.Types.ObjectId[];
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
  })
  notifications: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
