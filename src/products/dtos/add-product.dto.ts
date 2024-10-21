import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  stock: number;
  @IsNotEmpty()
  @IsNumber()
  review: number;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsString()
  categoryId: string;
  @IsNotEmpty()
  @IsString()
  avatar: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsArray()
  gallery: object;
  @IsBoolean()
  inStock: boolean;
  @IsString()
  @IsIn(['new_arrivals', 'feature', 'sales'])
  status: string;
}
