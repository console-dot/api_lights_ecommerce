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
import { createResponse } from '../common/utils/response.util';
import { Response } from 'express';
import { Public } from 'src/auth/constants';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutServices: CheckoutService) {}

  @Post()
  async createCheckout(@Body() checkoutData, @Res() res: Response) {
    try {
      const { checkout, message } =
        await this.checkoutServices.create(checkoutData);
      return res
        .status(HttpStatus.OK)
        .json(createResponse(checkout, message, HttpStatus.OK));
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
  @Public()
  @Get()
  async getAllCheckouts(@Res() res: Response) {
    try {
      const checkouts = await this.checkoutServices.findAll();
      return res.json(
        createResponse(checkouts, checkouts.message, HttpStatus.OK),
      );
    } catch (error) {
      console.log(error);
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
  @Public()
  @Get(':id')
  async getCheckout(@Param('id') id: string, @Res() res: Response) {
    try {
      const checkout = await this.checkoutServices.findOne(id);
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            checkout,
            'Checkout retrieved successfully',
            HttpStatus.OK,
          ),
        );
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(createResponse(null, 'Checkout not found', HttpStatus.NOT_FOUND));
    }
  }

  @Put(':id')
  async updateCheckout(
    @Param('id') id: string,
    @Body() updateCheckout,
    @Res() res: Response,
  ) {
    try {
      const { result, message } = await this.checkoutServices.update(
        id,
        updateCheckout,
      );
      return res
        .status(HttpStatus.OK)
        .json(createResponse(result, message, HttpStatus.OK));
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
  async deleteCheckout(@Param('id') id: string, @Res() res: Response) {
    try {
      const { result, message } = await this.checkoutServices.delete(id);
      return res.json(createResponse(result, message, HttpStatus.NO_CONTENT));
    } catch (error) {
      return res.json(createResponse(null, error.message, error.status));
    }
  }
}
