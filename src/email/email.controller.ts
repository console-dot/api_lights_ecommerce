import { Body, Controller, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Public } from 'src/auth/constants';
import { MailerService } from './email.service';
import { sendEmailDto } from './dto/email.dto';
import { Response } from 'express';
import { createResponse } from 'src/common/utils/response.util';

@Controller('mail')
export class MailController {
  constructor(private readonly emailService: MailerService) {}

  @Public()
  @Post('send')
  async sendMailer(@Body() body: { email: string }, @Res() res: Response) {
    const html = 'hello';
    const dto: sendEmailDto = {
      recipients: body.email,
      subject: 'Reset Password FireFly',
      html: html,
    };
    await this.emailService.sendEmail(dto);
    return res
      .status(HttpStatus.CREATED)
      .json(createResponse(null, 'send message in mail', HttpStatus.CREATED));
  }

  @Public()
  @Post('reset-password')
  async resetPassword(
    @Body('key') key: string,
    @Body('password1') password1: string,
    @Body('password2') password2: string,
  ) {
    try {
      const result = await this.emailService.resetPassword(
        key,
        password1,
        password2,
      );
      return {
        message: result.message,
        data: result.data,
        status: result.status,
      };
    } catch (err) {
      return {
        message: err?.message || 'Internal Server Error',
        status: err?.status || 500,
      };
    }
  }
}
