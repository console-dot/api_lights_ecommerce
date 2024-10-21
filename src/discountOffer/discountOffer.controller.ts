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
import { DiscountOfferService } from './discountOffer.service';
import { CreateDiscountOfferDto } from './dtos/add-discountOffer.dto';
import { UpdateDiscountOfferDto } from './dtos/update-discountOffer.dto';
@Controller('discountOffer')
export class DiscountOfferController {
  constructor(private readonly discountOfferService: DiscountOfferService) {}

  @Post()
  async discountOffer(
    @Body() createDiscountOfferDto: CreateDiscountOfferDto,
    @Res() res: Response,
  ) {
    try {
      const discountOffer = await this.discountOfferService.create(
        createDiscountOfferDto,
      );
      return res
        .status(HttpStatus.CREATED)
        .json(
          createResponse(
            discountOffer,
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
  async getAllDiscountOffer(@Res() res: Response) {
    try {
      const discountOffer = await this.discountOfferService.findAll();
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            discountOffer,
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
    return this.discountOfferService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDiscountOfferDto: UpdateDiscountOfferDto,
  ) {
    return this.discountOfferService.update(id, updateDiscountOfferDto);
  }
}
