import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.schema';
import { CreateProductDto } from './dtos/add-product.dto';
import { createResponse } from '../common/utils/response.util';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = new this.productModel(createProductDto);
      return product.save();
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

  async findAll(): Promise<Product[]> {
    try {
      return this.productModel
        .find()
        .populate('categoryId')
        .populate('gallery')
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

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.productModel
        .findById(id)
        .populate('categoryId')
        .populate('gallery')
        .populate('avatar')
        .exec();
      if (!product) {
        throw new HttpException(
          createResponse(null, 'Product not found', HttpStatus.NOT_FOUND),
          HttpStatus.NOT_FOUND,
        );
      }
      return product;
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

  async update(
    id: string,
    updateProductDto: CreateProductDto,
  ): Promise<Product> {
    try {
      const updatedProduct = await this.productModel
        .findByIdAndUpdate(id, updateProductDto, { new: true })
        .exec();
      if (!updatedProduct) {
        throw new HttpException(
          createResponse(null, 'Product not found', HttpStatus.NOT_FOUND),
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedProduct;
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
  async updateInStock(productId: string, inStock: boolean): Promise<Product> {
    try {
      const product = await this.productModel.findByIdAndUpdate(
        productId,
        { inStock },
        { new: true }, // This option returns the updated document
      );

      if (!product) {
        throw new HttpException(
          createResponse(null, 'Product not found', HttpStatus.NOT_FOUND),
          HttpStatus.NOT_FOUND,
        );
      }

      return product;
    } catch (error) {
      console.log(error);
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
  async delete(id: string): Promise<void> {
    try {
      const result = await this.productModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new HttpException(
          createResponse(null, 'Product not found', HttpStatus.NOT_FOUND),
          HttpStatus.NOT_FOUND,
        );
      }
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
}
