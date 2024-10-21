import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createResponse } from 'src/common/utils/response.util';
import { CategoryCardDesign } from './categoryCardDesign.schema';
import { CreateCategoryCardDesignDto } from './dtos/add-categoryCardDesign.dto';
import { UpdateCategoryCardDesignDto } from './dtos/update-categoryCardDesign.dto';

@Injectable()
export class CategoryCardDesignService {
  constructor(
    @InjectModel(CategoryCardDesign.name)
    private categoryCardDesignModel: Model<CategoryCardDesign>,
  ) {}

  async create(
    createCategoryCardDesignDto: CreateCategoryCardDesignDto,
  ): Promise<CategoryCardDesign> {
    try {
      const categoryCardDesign = new this.categoryCardDesignModel(
        createCategoryCardDesignDto,
      );
      const res = await categoryCardDesign.save();
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

  async findAll(): Promise<CategoryCardDesign[]> {
    try {
      return this.categoryCardDesignModel.find().populate('imageId').exec();
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

  async findOne(id: string): Promise<CategoryCardDesign> {
    return this.categoryCardDesignModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCategoryCardDesignDto: UpdateCategoryCardDesignDto,
  ): Promise<CategoryCardDesign> {
    return this.categoryCardDesignModel
      .findByIdAndUpdate(id, updateCategoryCardDesignDto, { new: true })
      .exec();
  }
}
