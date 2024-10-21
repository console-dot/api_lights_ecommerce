import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { createResponse } from 'src/common/utils/response.util';
import { Response } from 'express';
import { Public } from 'src/auth/constants';
import { CategoryCardDesignService } from './categoryCardDesign.service';
import { CreateCategoryCardDesignDto } from './dtos/add-categoryCardDesign.dto';
import { UpdateCategoryCardDesignDto } from './dtos/update-categoryCardDesign.dto';
@Controller('categoryCardDesign')
export class CategoryCardDesignController {
  constructor(
    private readonly categoryCardDesignService: CategoryCardDesignService,
  ) {}

  @Post()
  async categoryCardDesign(
    @Body() createCategoryCardDesignDto: CreateCategoryCardDesignDto,
    @Res() res: Response,
  ) {
    try {
      const categoryCardDesign = await this.categoryCardDesignService.create(
        createCategoryCardDesignDto,
      );
      return res
        .status(HttpStatus.CREATED)
        .json(
          createResponse(
            categoryCardDesign,
            'luxury created successfully',
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
  async getAllCategoryCardDesign(@Res() res: Response) {
    try {
      const categoryCardDesign = await this.categoryCardDesignService.findAll();
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            categoryCardDesign,
            'luxury retrieved successfully',
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
  async findOne(@Param('id') id: string) {
    return this.categoryCardDesignService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryCardDesignDto: UpdateCategoryCardDesignDto,
  ) {
    return this.categoryCardDesignService.update(
      id,
      updateCategoryCardDesignDto,
    );
  }
}
