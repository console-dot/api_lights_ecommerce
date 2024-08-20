import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
