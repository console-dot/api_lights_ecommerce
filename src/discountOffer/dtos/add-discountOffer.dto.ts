import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDiscountOfferDto {
  @IsNotEmpty()
  @IsString()
  imageId: string;

  @IsNotEmpty()
  @IsString()
  discountOfferh1: string;

  @IsNotEmpty()
  @IsString()
  discountOfferh2: string;
  
  @IsNotEmpty()
  @IsString()
  discountOfferh3: string;
}
