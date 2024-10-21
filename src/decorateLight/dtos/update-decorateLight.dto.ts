import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDecorateLightDto {
  @IsNotEmpty()
  @IsString()
  imageLeft: string;

  @IsNotEmpty()
  @IsString()
  imageRight: string;

  @IsNotEmpty()
  @IsString()
  decorateLighth1: string;

  @IsNotEmpty()
  @IsString()
  decorateLighth2: string;
}
