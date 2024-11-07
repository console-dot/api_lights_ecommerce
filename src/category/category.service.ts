import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';
import { CreateCategoryDto } from './dtos/add-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { createResponse } from '../common/utils/response.util';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  // Create
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  // Read (Get all categories)
  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().populate('bgImage').exec();
  }

  // Read (Get category by ID)
  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel
      .findById(id)
      .populate('bgImage')
      .exec();
    if (!category) {
      throw new HttpException(
        createResponse(null, 'Category not found', HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }
    return category;
  }

  // Update
  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();

    if (!updatedCategory) {
      throw new HttpException(
        createResponse(null, 'Category not found', HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }
    return updatedCategory;
  }

  // Delete
  async remove(id: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new HttpException(
        createResponse(null, 'Category not found', HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
