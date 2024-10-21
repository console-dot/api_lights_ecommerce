import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSignUpNewLetterDto {
  @IsNotEmpty()
  @IsString()
  imageId: string;

  @IsNotEmpty()
  @IsString()
  signUpNewLetterh1: string;

  @IsNotEmpty()
  @IsString()
  signUpNewLetterh2: string;
}
