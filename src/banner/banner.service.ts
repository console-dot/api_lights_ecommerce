import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Banner } from './banner.schema';
import { Model } from 'mongoose';
import { CreateBannerDto } from './dtos/add-banner.dto';
import { createResponse } from 'src/common/utils/response.util';
import { UpdateBannerDto } from './dtos/update-banner.dto';

@Injectable()
export class BannerService {
  constructor(@InjectModel(Banner.name) private bannerModel: Model<Banner>) {}

  async create(createBannerDto: CreateBannerDto): Promise<Banner> {
    try {
      const banner = new this.bannerModel(createBannerDto);
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

  async findAll(): Promise<Banner[]> {
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

  async findOne(id: string): Promise<Banner> {
    return this.bannerModel.findById(id).exec();
  }

  async update(id: string, updateBannerDto: UpdateBannerDto): Promise<Banner> {
    return this.bannerModel
      .findByIdAndUpdate(id, updateBannerDto, { new: true })
      .exec();
  }
}
