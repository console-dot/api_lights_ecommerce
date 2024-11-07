import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/products/products.schema';
import { User } from 'src/user/user.schema';

@Schema()
export class Cart {
  @Prop({
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    _id: false,
  })
  products: {
    productId: Product;
    quantity: number;
  }[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
