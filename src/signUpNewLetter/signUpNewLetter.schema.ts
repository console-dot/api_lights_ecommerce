import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type BannerDocument = HydratedDocument<SignUpNewLetter>;

@Schema()
export class SignUpNewLetter {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'File' })
  imageId: string;
  @Prop({ required: true })
  signUpNewLetterh1: string;
  @Prop({ required: true })
  signUpNewLetterh2: string;
}

export const SignUpNewLetterSchema =
  SchemaFactory.createForClass(SignUpNewLetter);
