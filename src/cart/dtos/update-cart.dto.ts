import { IsArray } from 'class-validator';

export class UpdateCartDto {
  @IsArray()
  productIds: [];
}
