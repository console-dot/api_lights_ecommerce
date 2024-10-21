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
import { CreateSignUpNewLetterDto } from './dtos/add-signUpNewLetter.dto';
import { UpdateSignUpNewLetterDto } from './dtos/update-signUpNewLetter.dto';
import { SignUpNewLetterService } from './signUpNewLetter.service';
@Controller('signUpNewLetter')
export class SignUpNewLetterController {
  constructor(
    private readonly signUpNewLetterService: SignUpNewLetterService,
  ) {}

  @Post()
  async signUpNewLetter(
    @Body() createSignUpNewLetterDto: CreateSignUpNewLetterDto,
    @Res() res: Response,
  ) {
    try {
      const signUpNewLetter = await this.signUpNewLetterService.create(
        createSignUpNewLetterDto,
      );
      return res
        .status(HttpStatus.CREATED)
        .json(
          createResponse(
            signUpNewLetter,
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
  async getAllSignUpNewLetter(@Res() res: Response) {
    try {
      const signUpNewLetter = await this.signUpNewLetterService.findAll();
      return res
        .status(HttpStatus.OK)
        .json(
          createResponse(
            signUpNewLetter,
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
    return this.signUpNewLetterService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSignUpNewLetterDto: UpdateSignUpNewLetterDto,
  ) {
    return this.signUpNewLetterService.update(id, updateSignUpNewLetterDto);
  }
}
