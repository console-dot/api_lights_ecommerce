import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Cart } from 'src/cart/cart.schema';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  age: number;
  @Prop({ required: true })
  postCode: number;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  province: string;
  @Prop({ required: true })
  city: string;
  @Prop({ required: true })
  address: string;
  @Prop({ required: true, default: true })
  isActive: boolean;
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Cart' })
  cartId: Cart;
}

export const UserSchema = SchemaFactory.createForClass(User);
