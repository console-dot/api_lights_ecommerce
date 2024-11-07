import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Category {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  bgImage: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
