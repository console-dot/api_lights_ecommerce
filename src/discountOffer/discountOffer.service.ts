import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createResponse } from 'src/common/utils/response.util';
import { DiscountOffer } from './discountOffer.schema';
import { CreateDiscountOfferDto } from './dtos/add-discountOffer.dto';
import { UpdateDiscountOfferDto } from './dtos/update-discountOffer.dto';

@Injectable()
export class DiscountOfferService {
  constructor(
    @InjectModel(DiscountOffer.name)
    private discountOfferModel: Model<DiscountOffer>,
  ) {}

  async create(
    createDiscountOfferDto: CreateDiscountOfferDto,
  ): Promise<DiscountOffer> {
    try {
      const discountOffer = new this.discountOfferModel(createDiscountOfferDto);
      const res = await discountOffer.save();
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

  async findAll(): Promise<DiscountOffer[]> {
    try {
      return this.discountOfferModel.find().populate('imageId').exec();
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

  async findOne(id: string): Promise<DiscountOffer> {
    return this.discountOfferModel.findById(id).exec();
  }

  async update(
    id: string,
    updateDiscountOfferDto: UpdateDiscountOfferDto,
  ): Promise<DiscountOffer> {
    return this.discountOfferModel
      .findByIdAndUpdate(id, updateDiscountOfferDto, { new: true })
      .exec();
  }
}
