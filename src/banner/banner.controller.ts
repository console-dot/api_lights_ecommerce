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
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dtos/add-banner.dto';
import { createResponse } from 'src/common/utils/response.util';
import { Response } from 'express';
import { UpdateBannerDto } from './dtos/update-banner.dto';
import { Public } from 'src/auth/constants';
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  async createBanner(
    @Body() createBannerDto: CreateBannerDto,
    @Res() res: Response,
  ) {
    try {
      const banner = await this.bannerService.create(createBannerDto);
      return res
        .status(HttpStatus.CREATED)
        .json(
          createResponse(
            banner,
            'banner created successfully',
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
  async getAllBanner(@Res() res: Response) {
    try {
      const banner = await this.bannerService.findAll();
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            banner,
            'banner retrieved successfully',
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
    return this.bannerService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    return this.bannerService.update(id, updateBannerDto);
  }
}
