import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

@Schema()
export class Visitor extends Document {
  @Prop({ required: true })
  app_id: string;

  @Prop({ required: true })
  id_visitor: string;

  @Prop({ required: false, default: now() })
  createdAt: Date;
}

export const VisitorSchema = SchemaFactory.createForClass(Visitor);
