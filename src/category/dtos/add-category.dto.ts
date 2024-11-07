import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsString()
  bgImage: string;
}
