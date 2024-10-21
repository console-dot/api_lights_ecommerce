import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBannerDto {
  @IsNotEmpty()
  @IsString()
  imageId: string;

  @IsNotEmpty()
  @IsString()
  bannerh1: string;

  @IsNotEmpty()
  @IsString()
  bannerh2: string;

  @IsNotEmpty()
  @IsString()
  bannerh3: string;

  @IsNotEmpty()
  @IsString()
  bannerh4: string;
}
