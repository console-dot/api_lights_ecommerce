import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type BannerDocument = HydratedDocument<DiscountOffer>;

@Schema()
export class DiscountOffer {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  imageId: string;
  @Prop({ required: true })
  discountOfferh1: string;
  @Prop({ required: true })
  discountOfferh2: string;
  @Prop({ required: true })
  discountOfferh3: string;
}

export const DiscountOfferSchema = SchemaFactory.createForClass(DiscountOffer);
