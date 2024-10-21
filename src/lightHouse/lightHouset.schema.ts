import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type BannerDocument = HydratedDocument<LightHouse>;

@Schema()
export class LightHouse {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  imageLeft: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  imageRight: string;
  @Prop({ required: true })
  lightHouseh1: string;
  @Prop({ required: true })
  lightHouseh2: string;
}

export const LightHouseSchema = SchemaFactory.createForClass(LightHouse);
