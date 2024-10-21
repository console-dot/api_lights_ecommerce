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
import { CreateDecorateLightDto } from './dtos/add-decorateLight.dto';
import { DecorateLightService } from './decorateLight.service';
import { UpdateLuxuryDto } from 'src/luxury/dtos/update-luxury.dto';
import { UpdateDecorateLightDto } from './dtos/update-decorateLight.dto';
@Controller('decorateLight')
export class DecorateLightController{
  constructor(private readonly decorateLightService: DecorateLightService) {}

  @Post()
  async luxuryBanner(
    @Body() createLuxuryDto: CreateDecorateLightDto,
    @Res() res: Response,
  ) {
    try {
      const decorateLightController = await this.decorateLightService.create(createLuxuryDto);
      return res
        .status(HttpStatus.CREATED)
        .json(
          createResponse(
            decorateLightController,
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
  async getAllLuxury(@Res() res: Response) {
    try {
      const decorateLightController = await this.decorateLightService.findAll();
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            decorateLightController,
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
    return this.decorateLightService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDecorateLightDto: UpdateDecorateLightDto,
  ) {
    return this.decorateLightService.update(id, updateDecorateLightDto);
  }
}
