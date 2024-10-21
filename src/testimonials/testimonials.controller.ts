// testimonial.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TestimonialService } from './testimonials.service';
import { CreateTestimonialDto } from './dtos/create-testimonials.dto';
import { UpdateTestimonialDto } from './dtos/update-testimonials.dto';
import { Public } from 'src/auth/constants';

@Controller('testimonial')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @Post()
  async create(@Body() createtestimonialDto: CreateTestimonialDto) {
    return this.testimonialService.create(createtestimonialDto);
  }
  @Public()
  @Get()
  async findAll() {
    return this.testimonialService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.testimonialService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ) {
    return this.testimonialService.update(id, updateTestimonialDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.testimonialService.remove(id);
  }
}
