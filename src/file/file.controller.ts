import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Res,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Response } from 'express';
import { createResponse } from 'src/common/utils/response.util';
import { UploadFile } from './file.service';
import { Public } from 'src/auth/constants';

@Controller('file')
export class FileController {
  constructor(private readonly imageService: FileService) { }

  // Create (Upload)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: UploadFile, @Res() res: Response) {
    try {
      const uploadedFile = await this.imageService.uploadImage(file);
      return res
        .status(HttpStatus.CREATED)
        .json(
          createResponse(
            uploadedFile,
            'File uploaded successfully',
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

  // Read (Get by ID)
  @Public()
  @Get(':id')
  async getFile(@Param('id') id: string, @Res() res: Response) {
    try {
      const file = await this.imageService.findOne(id);
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(file, 'File retrieved successfully', HttpStatus.OK),
        );
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(createResponse(null, 'File not found', HttpStatus.NOT_FOUND));
    }
  }

  // Read (Get all files)
  @Get()
  @Public()
  async getAllFiles(@Res() res: Response) {
    try {
      const files = await this.imageService.findAll();
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(files, 'Files retrieved successfully', HttpStatus.OK),
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

  // Update
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
    @Param('id') id: string,
    @UploadedFile() file: UploadFile,
    @Res() res: Response,
  ) {
    try {
      const updatedFile = await this.imageService.updateFile(id, file);
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            updatedFile,
            'File updated successfully',
            HttpStatus.OK,
          ),
        );
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(createResponse(null, 'File not found', HttpStatus.NOT_FOUND));
    }
  }

  // Delete
  @Delete(':id')
  async deleteFile(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.imageService.deleteFile(id);
      return res
        .status(HttpStatus.OK)
        .json(createResponse(null, 'File deleted successfully', HttpStatus.OK));
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(createResponse(null, 'File not found', HttpStatus.NOT_FOUND));
    }
  }
}
