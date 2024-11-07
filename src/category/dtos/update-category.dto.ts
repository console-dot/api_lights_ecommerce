import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsString()
  bgImage: string;
}
