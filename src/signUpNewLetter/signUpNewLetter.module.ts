import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SignUpNewLetterController } from './signUpNewLetter.controller';
import { SignUpNewLetterService } from './signUpNewLetter.service';
import {
  SignUpNewLetter,
  SignUpNewLetterSchema,
} from './signUpNewLetter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SignUpNewLetter.name, schema: SignUpNewLetterSchema },
    ]),
  ],
  controllers: [SignUpNewLetterController],
  providers: [SignUpNewLetterService],
  exports: [SignUpNewLetterService],
})
export class SignUpNewLettersModule {}
