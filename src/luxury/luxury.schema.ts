import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type BannerDocument = HydratedDocument<Luxury>;

@Schema()
export class Luxury {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  imageId: string;
  @Prop({ required: true })
  luxuryh1: string;
  @Prop({ required: true })
  luxuryh2: string;
}

export const LuxurySchema = SchemaFactory.createForClass(Luxury);
