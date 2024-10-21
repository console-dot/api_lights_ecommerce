import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSignUpNewLetterDto {
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
