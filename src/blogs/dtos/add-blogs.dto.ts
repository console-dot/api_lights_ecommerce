import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogsDto {
  @IsNotEmpty()
  @IsString()
  imageId: string;

  @IsNotEmpty()
  @IsString()
  blogsh1: string;

  @IsNotEmpty()
  @IsString()
  blogsh2: string;
}
