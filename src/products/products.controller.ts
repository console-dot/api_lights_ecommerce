/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dtos/add-product.dto';
import { createResponse } from '../common/utils/response.util';
import { Response } from 'express';
import { Public } from 'src/auth/constants';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productService.create(createProductDto);
      return res
        .status(HttpStatus.CREATED)
        .json(
          createResponse(
            product,
            'Product created successfully',
            HttpStatus.CREATED,
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
  @Public()
  @Get()
  async getAllProducts(@Res() res: Response) {
    try {
      const products = await this.productService.findAll();
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            products,
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
  @Public()
  @Get(':id')
  async getProduct(@Param('id') id: string, @Res() res: Response) {
    try {
      const product = await this.productService.findOne(id);
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            product,
            'Product retrieved successfully',
            HttpStatus.OK,
          ),
        );
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(createResponse(null, 'Product not found', HttpStatus.NOT_FOUND));
    }
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Res() res: Response,
  ) {
    try {
      const updatedProduct = await this.productService.update(
        id,
        updateProductDto,
      );
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            updatedProduct,
            'Product updated successfully',
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
  @Patch(':id')
  async updateInStock(
    @Param('id') id: string,
    @Body('inStock') inStock: boolean,
    @Res() res: Response,
  ) {
    try {
      const updatedProduct = await this.productService.updateInStock(
        id,
        inStock,
      );
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            updatedProduct,
            'Product stock status updated',
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
      await this.productService.delete(id);
      return res
        .status(HttpStatus.NO_CONTENT)
        .json(
          createResponse(
            null,
            'Product deleted successfully',
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
