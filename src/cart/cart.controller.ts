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
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { UpdateCartDto } from './dtos/update-cart.dto';
import { createResponse } from '../common/utils/response.util';
import { Response } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(
    @Body() createProductDto: AddToCartDto,
    @Res() res: Response,
  ) {
    try {
      const cart = await this.cartService.add(createProductDto);
      return res
        .status(HttpStatus.CREATED)
        .json(
          createResponse(cart, 'Cart created successfully', HttpStatus.CREATED),
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

  @Get()
  async getAllProducts(@Res() res: Response) {
    try {
      const cart = await this.cartService.findAll();
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            cart,
            'Products retrieved successfully',
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

  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.cartService.delete(id);
      return res
        .status(HttpStatus.NO_CONTENT)
        .json(
          createResponse(
            null,
            'Cart deleted successfully',
            HttpStatus.NO_CONTENT,
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
}
