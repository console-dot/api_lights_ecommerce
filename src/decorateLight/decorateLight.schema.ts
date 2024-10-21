import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type BannerDocument = HydratedDocument<DecorateLight>;

@Schema()
export class DecorateLight {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  imageLeft: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  imageRight: string;
  @Prop({ required: true })
  decorateLighth1: string;
  @Prop({ required: true })
  decorateLighth2: string;
}

export const DecorateLightSchema = SchemaFactory.createForClass(DecorateLight);
