/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './cart.schema';
import { Model } from 'mongoose';
import { UpdateCartDto } from './dtos/update-cart.dto';
import { createResponse } from '../common/utils/response.util';
import { User } from 'src/user/user.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async addUpdate(addToCartDto): Promise<{ cart: any; message: string }> {
    const { userId, product, cartId } = addToCartDto;
    const { productId, quantity } = product;
    try {
      const user = await this.userModel.findById(userId);
      const cart = await this.cartModel.findById(cartId);
      if (!user.cartId && !cart || cartId === null) {
        const cart = new this.cartModel({
          userId,
          products: [{ productId, quantity }],
        });
        const newCart = await cart.save();
        await this.userModel.findOneAndUpdate(
          { _id: userId },
          { $set: { cartId: newCart._id } },
          { new: true },
        );
        return { cart, message: 'Cart created successfully' };
      } else {
        const productIndex = cart.products.findIndex(
          (item) => item.productId.toString() === productId.toString(),
        );

        if (productIndex > -1) {
          cart.products[productIndex].quantity = quantity;
          await cart.save();
          return { cart, message: 'Product quantity updated successfully' };
        } else {
          cart.products.push({ productId, quantity });
          await cart.save();
          return { cart, message: 'Product added to cart successfully' };
        }
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

  async findAll(): Promise<{ cart: Cart[]; message: string }> {
    try {
      const cart = await this.cartModel
        .find()
        .populate('userId')
        .populate('products.productId')
        .exec();
      return { cart, message: 'Cart retrieved successfully' };
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

  async findOne(id: string): Promise<Cart> {
    try {
      const product = await this.cartModel
        .findById(id)
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
      const updatedProduct = await this.cartModel
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
  async deleteCartItem(product): Promise<Cart> {
    try {
      const { cartId, productId } = product;
      const userExist = await this.userModel.findById(cartId);
      const cartExist = await this.cartModel.findById(cartId);
      if (!cartExist && userExist ) {
        throw new HttpException(
          createResponse(null, 'Cart not found', HttpStatus.NOT_FOUND),
          HttpStatus.NOT_FOUND,
        ); 
      }

      const productIndex = cartExist.products.findIndex(
        (item) => item.productId.toString() === productId,
      );

      if (productIndex > -1) {
        cartExist.products = cartExist.products.filter(
          (item) => item.productId.toString() !== productId,
        );

        await cartExist.save();
        return cartExist;
      } else {
        throw new HttpException(
          createResponse(
            null,
            'Product not found in cart',
            HttpStatus.NOT_FOUND,
          ),
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        createResponse(null, error?.response.message, error?.response.status),
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
