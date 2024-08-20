import { IsArray } from 'class-validator';

export class AddToCartDto {
  @IsArray()
  productIds: [];
}
