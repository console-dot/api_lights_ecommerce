import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Cart } from 'src/cart/cart.schema';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  firstName: string;
  @Prop({ type: String, required: true })
  lastName: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ required: true })
  address: string;
  @Prop({ type: String, required: true })
  city: string;
  @Prop({ type: String, required: true })
  state: string;
  @Prop({ type: String, required: true })
  email: string;
  @Prop({ type: String, required: true })
  phone: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
  cartId: Cart;
  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
