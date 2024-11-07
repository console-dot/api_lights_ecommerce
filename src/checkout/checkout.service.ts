/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Checkout } from './checkout.schema';
import { createResponse } from '../common/utils/response.util';
import { Cart } from 'src/cart/cart.schema';
import { Product, ProductSchema } from 'src/products/products.schema';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectModel(Checkout.name) private checkoutModel: Model<Checkout>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(checkoutDate): Promise<{ checkout: Checkout; message: string }> {
    try {
      const cartId = checkoutDate?.cartId;
      const productIds =
        checkoutDate.products?.map((item) => item.productId) || [];
      const checkout = new this.checkoutModel(checkoutDate);
      await checkout.save();
      for (const productId of productIds) {
        const product = await this.productModel.findById(productId);
        if (product) {
          const item = checkoutDate.products?.find(
            (item) => item.productId.toString() === product._id.toString(),
          );

          if (item) {
            const quantityToSubtract = item.quantity;
            if (product.stock >= quantityToSubtract) {
              (product.stock -= quantityToSubtract), await product.save();
            } else {
              console.error(
                `Insufficient stock for product ${product._id}. Current stock: ${product.stock}, Requested: ${quantityToSubtract}`,
              );
            }
          }
        } else {
          console.warn(`Product with ID ${productId} not found.`);
        }
      }
      const cart = await this.cartModel.findById(cartId);
      if (cart && Array.isArray(cart.products)) {
        cart.products = cart.products.filter((item) =>
          productIds.includes(item.productId),
        );
        await cart.save();
      } else {
        console.log('Cart not found or products is not an array.');
      }
      const populatedCheckout = await checkout.populate('products.productId');
      return { checkout: populatedCheckout, message: 'Checkout successfully' };
    } catch (error) {
      console.error('Error in checkout creation:', error);
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
        .populate({
          path: 'products',
          populate: {
            path: 'productId',
            populate: {
              path: 'avatar',
            },
          },
        })
        // .populate('categoryId')
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
        .populate('products.productId')
        .populate({
          path: 'products',
          populate: {
            path: 'productId',
            populate: {
              path: 'avatar',
            },
          },
        })
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
