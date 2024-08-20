import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type TestimonialDocument = HydratedDocument<Testimonial>;

@Schema()
export class Testimonial {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  avatar: string;
  @Prop({ required: true })
  rating: number;
  @Prop({ required: true })
  review: string;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
