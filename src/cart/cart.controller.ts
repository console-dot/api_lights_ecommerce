/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dtos/update-cart.dto';
import { createResponse } from '../common/utils/response.util';
import { Response } from 'express';
import { Public } from 'src/auth/constants';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() addToCartDto, @Res() res: Response) {
    try {
      if (!addToCartDto.product.productId || !addToCartDto.userId) {
        return res.json(
          createResponse(
            null,
            'Product Id or User Id is missing',
            HttpStatus.BAD_REQUEST,
          ),
        );
      }
      const { cart, message } = await this.cartService.addUpdate(addToCartDto);
      return res
        .status(HttpStatus.OK)
        .json(createResponse(cart, message, HttpStatus.OK));
    } catch (error) {
      console.error(error);
      return res
        .status(error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          createResponse(
            null,
            error.response?.message || 'Internal Server Error',
            error.status || HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
    }
  }
  @Public()
  @Get()
  async getCarts(@Res() res: Response) {
    try {
      const cart = await this.cartService.findAll();
      return res
        .status(HttpStatus.OK)
        .json(createResponse(cart, cart.message, HttpStatus.OK));
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          createResponse(
            null,
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
    }
  }

  @Get(':id')
  async getProduct(@Param('id') id: string, @Res() res: Response) {
    try {
      const cart = await this.cartService.findOne(id);
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(cart, 'Cart retrieved successfully', HttpStatus.OK),
        );
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(createResponse(null, 'Cart not found', HttpStatus.NOT_FOUND));
    }
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
    @Res() res: Response,
  ) {
    try {
      const updatedCart = await this.cartService.update(id, updateCartDto);
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            updatedCart,
            'Cart updated successfully',
            HttpStatus.OK,
          ),
        );
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(
          createResponse(
            null,
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
    }
  }

  @Delete()
  async deleteProduct(@Body() product, @Res() res: Response) {
    try {
      const cart = await this.cartService.deleteCartItem(product);
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            cart.products,
            'Product deleted from Cart successfully',
            HttpStatus.OK,
          ),
        );
    } catch (error) {
      return res.json(
        createResponse(
          error.response.data,
          error.response.message,
          error.response.status,
        ),
      );
    }
  }
}
