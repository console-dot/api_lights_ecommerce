import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResetPasswordDocument = HydratedDocument<ResetPassword>;

@Schema({ timestamps: { createdAt: true, updatedAt: false }, expires: '5m' }) // optional, for automatic `createdAt`
export class ResetPassword {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  key: string;

  @Prop({ type: Date, default: Date.now, expires: '5m' })
  createdAt: Date;
}

export const ResetPasswordSchema = SchemaFactory.createForClass(ResetPassword);
