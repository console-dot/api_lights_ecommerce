import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testimonial } from './testimonials.schema';
import { CreateTestimonialDto } from './dtos/create-testimonials.dto';
import { UpdateTestimonialDto } from './dtos/update-testimonials.dto';

@Injectable()
export class TestimonialService {
  constructor(
    @InjectModel(Testimonial.name) private testimonialModel: Model<Testimonial>,
  ) {}

  async create(
    createTestimonialDto: CreateTestimonialDto,
  ): Promise<Testimonial> {
    const createdUser = new this.testimonialModel(createTestimonialDto);
    return createdUser.save();
  }

  async findAll(): Promise<Testimonial[]> {
    return this.testimonialModel.find().populate('avatar').exec();
  }

  async findOne(id: string): Promise<Testimonial> {
    return this.testimonialModel.findById(id).populate('avatar');
  }
  async login(email: string): Promise<Testimonial> {
    return this.testimonialModel.findOne({ email: email }).exec();
  }

  async update(
    id: string,
    updateTestimonialDto: UpdateTestimonialDto,
  ): Promise<Testimonial> {
    return this.testimonialModel
      .findByIdAndUpdate(id, updateTestimonialDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Testimonial> {
    return this.testimonialModel.findByIdAndDelete(id).exec();
  }
}
