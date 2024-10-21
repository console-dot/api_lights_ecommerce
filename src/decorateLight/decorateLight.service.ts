import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createResponse } from 'src/common/utils/response.util';
import { DecorateLight } from './decorateLight.schema';
import { CreateDecorateLightDto } from './dtos/add-decorateLight.dto';
import { UpdateDecorateLightDto } from './dtos/update-decorateLight.dto';

@Injectable()
export class DecorateLightService {
  constructor(
    @InjectModel(DecorateLight.name)
    private decorateLightModel: Model<DecorateLight>,
  ) {}

  async create(
    createDecorateLightDto: CreateDecorateLightDto,
  ): Promise<DecorateLight> {
    try {
      const banner = new this.decorateLightModel(createDecorateLightDto);
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

  async findAll(): Promise<DecorateLight[]> {
    try {
      return this.decorateLightModel
        .find()
        .populate('imageLeft')
        .populate('imageRight')
        .exec();
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

  async findOne(id: string): Promise<DecorateLight> {
    return this.decorateLightModel.findById(id).exec();
  }

  async update(
    id: string,
    updateLuxuryDto: UpdateDecorateLightDto,
  ): Promise<DecorateLight> {
    return this.decorateLightModel
      .findByIdAndUpdate(id, updateLuxuryDto, { new: true })
      .exec();
  }
}
