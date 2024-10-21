import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createResponse } from 'src/common/utils/response.util';
import { Luxury } from './luxury.schema';
import { CreateLuxuryDto } from './dtos/add-luxury.dto';
import { UpdateLuxuryDto } from './dtos/update-luxury.dto';

@Injectable()
export class LuxuryService {
  constructor(@InjectModel(Luxury.name) private bannerModel: Model<Luxury>) {}

  async create(createLuxuryDto: CreateLuxuryDto): Promise<Luxury> {
    try {
      const banner = new this.bannerModel(createLuxuryDto);
      const res = await banner.save();
      return res;
    } catch (error) {
      throw new HttpException(
        createResponse(
          'Internal Server Error',
          error.message || 'Failed to save the banner',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Luxury[]> {
    try {
      return this.bannerModel.find().populate('imageId').exec();
    } catch (error) {
      throw new HttpException(
        createResponse(
          null,
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Luxury> {
    return this.bannerModel.findById(id).exec();
  }

  async update(id: string, updateLuxuryDto: UpdateLuxuryDto): Promise<Luxury> {
    return this.bannerModel
      .findByIdAndUpdate(id, updateLuxuryDto, { new: true })
      .exec();
  }
}
