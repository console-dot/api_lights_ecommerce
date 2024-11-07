/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/products/products.schema';
import { User } from 'src/user/user.schema';

@Schema()
export class Checkout {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;
  @Prop({ type: String, required: true })
  firstName: string;
  @Prop({ type: String, required: true })
  lastName: string;
  @Prop({ type: String, required: true })
  address: string;
  @Prop({ type: String, required: true })
  city: string;
  @Prop({ type: String, required: true })
  state: string;
  @Prop({ type: String, required: true })
  email: string;
  @Prop({ type: String, required: true })
  phone: string;
  @Prop({
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      },
    ],
    _id: false,
  })
  products: {
    productId: Product;
    quantity: number;
    price: number;
  }[];

  @Prop({ default: Date.now })
  checkoutDate: Date;

  @Prop({
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending',
  })
  status: string;
}

export const CheckoutSchema = SchemaFactory.createForClass(Checkout);
