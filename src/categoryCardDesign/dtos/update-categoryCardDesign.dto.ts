import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryCardDesignDto {
  @IsNotEmpty()
  @IsString()
  imageId: string;

  @IsNotEmpty()
  @IsString()
  categoryCardDesignh1: string;

  @IsNotEmpty()
  @IsString()
  categoryCardDesignh2: string;
}
