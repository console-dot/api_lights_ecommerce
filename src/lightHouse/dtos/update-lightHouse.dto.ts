import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLightHouseDto {
  @IsNotEmpty()
  @IsString()
  imageLeft: string;

  @IsNotEmpty()
  @IsString()
  imageRight: string;

  @IsNotEmpty()
  @IsString()
  lightHouseh1: string;

  @IsNotEmpty()
  @IsString()
  lightHouseh2: string;
}
