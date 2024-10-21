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
import { CreateBlogsDto } from './dtos/add-blogs.dto';
import { UpdateBlogsDto } from './dtos/update-blogs.dto';
import { BlogsService } from './blogs.service';
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  async Blogs(@Body() createBlogsDto: CreateBlogsDto, @Res() res: Response) {
    try {
      const blogs = await this.blogsService.create(createBlogsDto);
      return res
        .status(HttpStatus.CREATED)
        .json(
          createResponse(
            blogs,
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
  async getAllBlogs(@Res() res: Response) {
    try {
      const blogs = await this.blogsService.findAll();
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(blogs, 'luxury retrieved successfully', HttpStatus.OK),
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
    return this.blogsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogsDto: UpdateBlogsDto,
  ) {
    return this.blogsService.update(id, updateBlogsDto);
  }
}
