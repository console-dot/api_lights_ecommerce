import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type BannerDocument = HydratedDocument<Banner>;

@Schema()
export class Banner {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  imageId: string;
  @Prop({ required: true })
  bannerh1: string;
  @Prop({ required: true })
  bannerh2: string;
  @Prop({ required: true })
  bannerh3: string;
  @Prop({ required: true })
  bannerh4: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
