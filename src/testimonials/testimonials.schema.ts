import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type TestimonialDocument = HydratedDocument<Testimonial>;

@Schema()
export class Testimonial {
  @Prop({ required: true })
  name: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  avatar: string;
  @Prop({ required: true })
  rating: number;
  @Prop({ required: true })
  review: string;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
