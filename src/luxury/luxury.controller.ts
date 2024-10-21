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
import { LuxuryService } from './luxury.service';
import { CreateLuxuryDto } from './dtos/add-luxury.dto';
import { UpdateLuxuryDto } from './dtos/update-luxury.dto';
@Controller('luxury')
export class LuxuryController {
  constructor(private readonly luxuryService: LuxuryService) {}

  @Post()
  async luxuryBanner(
    @Body() createLuxuryDto: CreateLuxuryDto,
    @Res() res: Response,
  ) {
    try {
      const luxury = await this.luxuryService.create(createLuxuryDto);
      return res
        .status(HttpStatus.CREATED)
        .json(
          createResponse(
            luxury,
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
      const luxury = await this.luxuryService.findAll();
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            luxury,
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
    return this.luxuryService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLuxuryDto: UpdateLuxuryDto,
  ) {
    return this.luxuryService.update(id, updateLuxuryDto);
  }
}
