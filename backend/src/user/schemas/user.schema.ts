import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

// This is the schema definition for the User model.
@Schema({
  timestamps: true,
})
export class User extends mongoose.Document {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  createdAt: { type: Date };
  updatedAt: { type: Date };
}

export const UserSchema = SchemaFactory.createForClass(User);
