import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/products/products.schema';

@Schema()
export class Cart {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  productIds: Product[];
}
export const CartSchema = SchemaFactory.createForClass(Cart);
