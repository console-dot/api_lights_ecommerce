import { IsObject, IsString, IsNumber } from 'class-validator';

export class ProductDto {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;
}

export class AddToCartDto {
  @IsObject()
  cartProduct: ProductDto;
}
