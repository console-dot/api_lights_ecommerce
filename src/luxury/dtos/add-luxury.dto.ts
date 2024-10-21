import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLuxuryDto {
  @IsNotEmpty()
  @IsString()
  imageId: string;

  @IsNotEmpty()
  @IsString()
  luxuryh1: string;

  @IsNotEmpty()
  @IsString()
  luxuryh2: string;
}
