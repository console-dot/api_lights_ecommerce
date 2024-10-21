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
import { LightHouseService } from './lightHouse.service';
import { UpdateLuxuryDto } from 'src/luxury/dtos/update-luxury.dto';
import { CreateLightHouseDto } from './dtos/add-lightHousedto';
import { UpdateLightHouseDto } from './dtos/update-lightHouse.dto';
@Controller('lightHouse')
export class LightHouseController {
  constructor(private readonly lightHouseService: LightHouseService) {}

  @Post()
  async lightHouse(
    @Body() createLightHouseDto: CreateLightHouseDto,
    @Res() res: Response,
  ) {
    try {
      const lightHouseController =
        await this.lightHouseService.create(createLightHouseDto);
      return res
        .status(HttpStatus.CREATED)
        .json(
          createResponse(
            lightHouseController,
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
      const decorateLightController = await this.lightHouseService.findAll();
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
    return this.lightHouseService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLightHouseDto: UpdateLightHouseDto,
  ) {
    return this.lightHouseService.update(id, updateLightHouseDto);
  }
}
