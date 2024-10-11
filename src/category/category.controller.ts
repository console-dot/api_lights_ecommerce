import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/add-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Response } from 'express';
import { createResponse } from '../common/utils/response.util';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Create
  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res() res: Response,
  ) {
    try {
      const category = await this.categoryService.create(createCategoryDto);
      return res
        .status(HttpStatus.CREATED)
        .json(
          createResponse(
            category,
            'Category created successfully',
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

  // Read (Get all categories)
  @Get()
  async getAllCategories(@Res() res: Response) {
    try {
      const categories = await this.categoryService.findAll();
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            categories,
            'Categories retrieved successfully',
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

  // Read (Get category by ID)
  @Get(':id')
  async getCategory(@Param('id') id: string, @Res() res: Response) {
    try {
      const category = await this.categoryService.findOne(id);
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            category,
            'Category retrieved successfully',
            HttpStatus.OK,
          ),
        );
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(createResponse(null, 'Category not found', HttpStatus.NOT_FOUND));
    }
  }

  // Update
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res: Response,
  ) {
    try {
      const updatedCategory = await this.categoryService.update(
        id,
        updateCategoryDto,
      );
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            updatedCategory,
            'Category updated successfully',
            HttpStatus.OK,
          ),
        );
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(createResponse(null, 'Category not found', HttpStatus.NOT_FOUND));
    }
  }

  // Delete
  @Delete(':id')
  async deleteCategory(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.categoryService.remove(id);
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(null, 'Category deleted successfully', HttpStatus.OK),
        );
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(createResponse(null, 'Category not found', HttpStatus.NOT_FOUND));
    }
  }
}
