import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createResponse } from 'src/common/utils/response.util';
import { LightHouse } from './lightHouset.schema';
import { CreateLightHouseDto } from './dtos/add-lightHousedto';
import { UpdateLightHouseDto } from './dtos/update-lightHouse.dto';

@Injectable()
export class LightHouseService {
  constructor(
    @InjectModel(LightHouse.name)
    private lightHouseModel: Model<LightHouse>,
  ) {}

  async create(createLightHouseDto: CreateLightHouseDto): Promise<LightHouse> {
    try {
      const banner = new this.lightHouseModel(createLightHouseDto);
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

  async findAll(): Promise<LightHouse[]> {
    try {
      return this.lightHouseModel.find()
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

  async findOne(id: string): Promise<LightHouse> {
    return this.lightHouseModel.findById(id).exec();
  }

  async update(
    id: string,
    updateLightHouseDto: UpdateLightHouseDto,
  ): Promise<LightHouse> {
    return this.lightHouseModel.findByIdAndUpdate(id, updateLightHouseDto, {
      new: true,
    }).exec();
  }
}
