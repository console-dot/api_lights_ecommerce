import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createResponse } from 'src/common/utils/response.util';
import { Blogs } from './blogs.schema';
import { CreateBlogsDto } from './dtos/add-blogs.dto';
import { UpdateBlogsDto } from './dtos/update-blogs.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blogs.name)
    private blogsModel: Model<Blogs>,
  ) {}

  async create(
    createBlogsDto: CreateBlogsDto,
  ): Promise<Blogs> {
    try {
      const Blogs = new this.blogsModel(
        createBlogsDto,
      );
      const res = await Blogs.save();
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

  async findAll(): Promise<Blogs[]> {
    try {
      return this.blogsModel.find().populate('imageId').exec();
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

  async findOne(id: string): Promise<Blogs> {
    return this.blogsModel.findById(id).exec();
  }

  async update(
    id: string,
    updateBlogsDto: UpdateBlogsDto,
  ): Promise<Blogs> {
    return this.blogsModel
      .findByIdAndUpdate(id, updateBlogsDto, { new: true })
      .exec();
  }
}
