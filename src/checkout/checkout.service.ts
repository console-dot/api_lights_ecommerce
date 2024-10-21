/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Checkout } from './checkout.schema';
import { createResponse } from '../common/utils/response.util';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectModel(Checkout.name) private checkoutModel: Model<Checkout>,
  ) {}

  async create(checkoutDate): Promise<{ checkout: Checkout; message: string }> {
    try {
      const checkout = new this.checkoutModel(checkoutDate);
      await checkout.save();
      return { checkout, message: 'Checkout successfully' };
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

  async findAll(): Promise<{ checkout: Checkout[]; message: string }> {
    try {
      const checkout = await this.checkoutModel
        .find()
        .populate('products.productId')
        .exec();
      return { checkout, message: 'Checkout successfully' };
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

  async findOne(id: string): Promise<Checkout> {
    try {
      const checkout = await this.checkoutModel
        .findById(id)
        .populate('categoryId')
        .populate('gallery')
        .populate('avatar')
        .exec();
      if (!checkout) {
        throw new HttpException(
          createResponse(null, 'Checkout not found', HttpStatus.NOT_FOUND),
          HttpStatus.NOT_FOUND,
        );
      }
      return checkout;
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
    updateCheckoutData,
  ): Promise<{ result: Checkout; message: string }> {
    try {
      const result = await this.checkoutModel
        .findByIdAndUpdate(id, updateCheckoutData, { new: true })
        .exec();
      if (!result) {
        return { result, message: 'Checkout not found' };
      } else {
        return { result, message: 'Checkout updated successfully' };
      }
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
  async updateInStock(checkoutId: string, inStock: boolean): Promise<Checkout> {
    try {
      const checkout = await this.checkoutModel.findByIdAndUpdate(
        checkoutId,
        { inStock },
        { new: true }, // This option returns the updated document
      );

      if (!checkout) {
        throw new HttpException(
          createResponse(null, 'Checkout not found', HttpStatus.NOT_FOUND),
          HttpStatus.NOT_FOUND,
        );
      }

      return checkout;
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
  async delete(id: string): Promise<{ result: Checkout; message: string }> {
    try {
      const result = await this.checkoutModel.findByIdAndDelete(id).exec();

      if (!result) {
        return { result, message: 'Checkout not found' };
      } else {
        return { result, message: 'Checkout deleted successfully' };
      }
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
}
