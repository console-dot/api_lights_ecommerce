/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from 'src/category/category.schema';

@Schema()
export class Product {
  @Prop()
  name: string;
  @Prop()
  price: number;
  @Prop()
  description: string;
  @Prop()
  stock: number;
  @Prop({ default: true })
  inStock: boolean;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  categoryId: Category;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  avatar: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  bgImage: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }] })
  gallery: File[];
  @Prop({ enum: ['new_arrivals', 'feature', 'sales', 'none'], type: String })
  section: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
