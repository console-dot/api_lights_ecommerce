import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type BannerDocument = HydratedDocument<CategoryCardDesign>;

@Schema()
export class CategoryCardDesign {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  imageId: string;
  @Prop({ required: true })
  categoryCardDesignh1: string;
  @Prop({ required: true })
  categoryCardDesignh2: string;
}

export const CategoryCardDesignSchema =
  SchemaFactory.createForClass(CategoryCardDesign);
