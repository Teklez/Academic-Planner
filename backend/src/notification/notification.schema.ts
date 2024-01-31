import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

// This is the schema definition for the User model.
@Schema({
  timestamps: true,
})
export class Notification extends mongoose.Document {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  time: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
