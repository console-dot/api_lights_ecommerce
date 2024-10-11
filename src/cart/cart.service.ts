import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './cart.schema';
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';
import { createResponse } from '../common/utils/response.util';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private productModel: Model<Cart>) {}

  async add(addToCart: AddToCartDto): Promise<Cart> {
    try {
      const product = new this.productModel(addToCart);
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

  async findAll(): Promise<Cart[]> {
    try {
      return this.productModel.find().populate('productIds').exec();
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

  async findOne(id: string): Promise<Cart> {
    try {
      const product = await this.productModel
        .findById(id)
        .populate('productIds')
        .exec();
      if (!product) {
        throw new HttpException(
          createResponse(null, 'Cart not found', HttpStatus.NOT_FOUND),
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

  async update(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    try {
      const updatedProduct = await this.productModel
        .findByIdAndUpdate(id, updateCartDto, { new: true })
        .exec();
      if (!updatedProduct) {
        throw new HttpException(
          createResponse(null, 'Cart not found', HttpStatus.NOT_FOUND),
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
  async delete(id: string): Promise<void> {
    try {
      const result = await this.productModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new HttpException(
          createResponse(null, 'Cart not found', HttpStatus.NOT_FOUND),
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
