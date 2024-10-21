import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createResponse } from 'src/common/utils/response.util';
import { SignUpNewLetter } from './signUpNewLetter.schema';
import { CreateSignUpNewLetterDto } from './dtos/add-signUpNewLetter.dto';
import { UpdateSignUpNewLetterDto } from './dtos/update-signUpNewLetter.dto';

@Injectable()
export class SignUpNewLetterService {
  constructor(
    @InjectModel(SignUpNewLetter.name)
    private signUpNewLetterModel: Model<SignUpNewLetter>,
  ) {}

  async create(
    createSignUpNewLetterDto: CreateSignUpNewLetterDto,
  ): Promise<SignUpNewLetter> {
    try {
      const SignUpNewLetter = new this.signUpNewLetterModel(
        createSignUpNewLetterDto,
      );
      const res = await SignUpNewLetter.save();
      return res;
    } catch (error) {
      throw new HttpException(
        createResponse(
          'Internal Server Error',
          error.message || 'Failed to save the banner',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<SignUpNewLetter[]> {
    try {
      return this.signUpNewLetterModel.find().populate('imageId').exec();
    } catch (error) {
      throw new HttpException(
        createResponse(
          null,
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<SignUpNewLetter> {
    return this.signUpNewLetterModel.findById(id).exec();
  }

  async update(
    id: string,
    updateSignUpNewLetterDto: UpdateSignUpNewLetterDto,
  ): Promise<SignUpNewLetter> {
    return this.signUpNewLetterModel
      .findByIdAndUpdate(id, updateSignUpNewLetterDto, { new: true })
      .exec();
  }
}
