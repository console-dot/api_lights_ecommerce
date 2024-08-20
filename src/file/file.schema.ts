import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class File extends Document {
  @Prop({ required: true })
  image: string;

  @Prop()
  originalname?: string;
  @Prop()
  mimetype?: string;
}

export const FileSchema = SchemaFactory.createForClass(File);
