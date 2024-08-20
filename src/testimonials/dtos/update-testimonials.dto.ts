import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTestimonialDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  avatar: string;
  @IsNumber()
  @IsNotEmpty()
  rating: number;
  @IsNotEmpty()
  review: string;
}
