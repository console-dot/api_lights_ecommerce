/* eslint-disable prettier/prettier */
// testimonial.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TestimonialService } from './testimonials.service';
import { CreateTestimonialDto } from './dtos/create-testimonials.dto';
import { UpdateTestimonialDto } from './dtos/update-testimonials.dto';
import { Public } from 'src/auth/constants';
import { createResponse } from 'src/common/utils/response.util';
import { Response } from 'express';
@Controller('testimonial')
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @Post()
  async create(
    @Body() createtestimonialDto: CreateTestimonialDto,
    @Res() res: Response,
  ) {
    try {
      const isCreated =
        await this.testimonialService.create(createtestimonialDto);
      if (!isCreated) {
        return res.json(
          createResponse(
            null,
            'Error occured while adding Testimonial',
            HttpStatus.BAD_REQUEST,
          ),
        );
      }
      return res.json(
        createResponse(null, 'Testimonial successfully Added', HttpStatus.OK),
      );
    } catch (error) {
      console.log(error);
      return res.json(
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
  async findAll(@Res() res: Response) {
    try {
      const testimonials = await this.testimonialService.findAll();
      if (!testimonials) {
        return res.json(
          createResponse(null, 'Testimonial not found', HttpStatus.NOT_FOUND),
        );
      } else {
        return res.json(
          createResponse(testimonials, 'Testimonial not found', HttpStatus.OK),
        );
      }
    } catch (error) {
      console.log(error);
      return res.json(
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
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const testimonials = await this.testimonialService.findOne(id);
      if (!testimonials) {
        return res.json(
          createResponse(null, 'Testimonial not found', HttpStatus.NOT_FOUND),
        );
      } else {
        return res.json(
          createResponse(testimonials, 'Testimonial not found', HttpStatus.OK),
        );
      }
    } catch (error) {
      console.log(error);
      return res.json(
        createResponse(
          null,
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
    @Res() res: Response,
  ) {
    try {
      const isUpdated = await this.testimonialService.update(
        id,
        updateTestimonialDto,
      );
      if (!isUpdated) {
        return res.json(
          createResponse(null, 'Testimonial not found', HttpStatus.NOT_FOUND),
        );
      }
      return res.json(
        createResponse(null, 'Testimonial successfully updated', HttpStatus.OK),
      );
    } catch (error) {
      console.log(error);
      return res.json(
        createResponse(
          null,
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const isDeleted = await this.testimonialService.remove(id); // Await the result
      if (!isDeleted) {
        return res.json(
          createResponse(null, 'Testimonial not found', HttpStatus.NOT_FOUND),
        );
      }
      return res.json(
        createResponse(null, 'Testimonial successfully deleted', HttpStatus.OK),
      );
    } catch (error) {
      console.log(error);
      return res.json(
        createResponse(
          null,
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }
}
