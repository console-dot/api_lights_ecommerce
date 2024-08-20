import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
