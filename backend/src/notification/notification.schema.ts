import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Notification {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  time: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
