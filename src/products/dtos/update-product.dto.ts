/* eslint-disable prettier/prettier */
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  stock: number;
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
  @IsIn(['new_arrivals', 'feature', 'sales', 'none'])
  section: string;
}
