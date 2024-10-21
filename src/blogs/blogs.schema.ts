import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type BannerDocument = HydratedDocument<Blogs>;

@Schema()
export class Blogs {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  imageId: string;
  @Prop({ required: true })
  blogsh1: string;
  @Prop({ required: true })
  blogsh2: string;
}

export const BlogsSchema = SchemaFactory.createForClass(Blogs);
