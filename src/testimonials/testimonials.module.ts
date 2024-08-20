import { Module } from '@nestjs/common';
import { TestimonialController } from './testimonials.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Testimonial, TestimonialSchema } from './testimonials.schema';
import { TestimonialService } from './testimonials.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Testimonial.name, schema: TestimonialSchema },
    ]),
  ],
  controllers: [TestimonialController],
  providers: [TestimonialService],
  exports: [TestimonialService],
})
export class TestimonialModule {}
