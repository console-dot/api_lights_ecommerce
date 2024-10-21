import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from './file.schema';
import { createResponse } from 'src/common/utils/response.util';

export interface UploadFile {
  buffer: Buffer;
  originalName: string;
  mimetype: string;
}

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private imageModel: Model<File>) {}

  // Create (Upload)
  async uploadImage(file: UploadFile): Promise<File> {
    const base64Image = file.buffer.toString('base64');
    const newImage = new this.imageModel({ image: base64Image });
    return newImage.save();
  }

  // Read (Get by ID)
  async findOne(id: string): Promise<File | null> {
    try {
      const image = await this.imageModel.findById(id).exec();
      if (!image) {
        throw new HttpException(
          createResponse(null, 'File not found', HttpStatus.NOT_FOUND),
          HttpStatus.NOT_FOUND,
        );
      } else {
        return image;
      }
    } catch (error) {
      throw new HttpException(
        createResponse(null, 'File not found', HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // Read (Get all files)
  async findAll(): Promise<File[]> {
    return this.imageModel.find().exec();
  }

  // Update
  async updateFile(id: string, file: UploadFile): Promise<File> {
    try {
      const base64Image = file.buffer.toString('base64');
      const updatedImage = await this.imageModel.findByIdAndUpdate(
        id,
        { image: base64Image },
        { new: true },
      );
      if (!updatedImage) {
        throw new HttpException(
          createResponse(null, 'File not found', HttpStatus.NOT_FOUND),
          HttpStatus.NOT_FOUND,
        );
      }
      return updatedImage;
    } catch (error) {
      throw new HttpException(
        createResponse(null, 'File not found', HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // Delete
  async deleteFile(id: string): Promise<void> {
    const result = await this.imageModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new HttpException(
        createResponse(null, 'File not found', HttpStatus.NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
