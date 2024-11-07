import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { sendEmailDto } from './dto/email.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { ResetPassword } from './email.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class MailerService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(ResetPassword.name) private resetModel: Model<ResetPassword>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
    return transporter;
  }
  async sendEmail(dto: sendEmailDto) {
    const { recipients, subject } = dto;
    const transporter = this.mailTransport();
    const user = await this.userModel.findOne({ email: recipients });

    if (!user) {
      throw new UnauthorizedException('Email not exists');
    }

    // Remove any existing reset keys for this email
    await this.resetModel.deleteMany({ email: recipients });

    // Generate a new token for password reset
    const key = await this.jwtService.signAsync(
      { email: recipients },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '5m',
      },
    );
    const resetRequest = new this.resetModel({ email: recipients, key });
    await resetRequest.save();
    // Define the email content
    const mainHtml = `
      <!doctype html>
      <html lang="en-US">
      <head>
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Reset Password Email</title>
          <style type="text/css">
              a:hover {text-decoration: underline !important;}
          </style>
      </head>
      <body style="margin: 0px; background-color: #F2F3F8;">
          <table width="100%" bgcolor="#F2F3F8">
      
              <tr><td style="padding: 20px; background:#fff; border-radius:3px; text-align:center;">
                  <h1 style="color:#1e1e2d;">You requested a password reset</h1>
                  <p style="color:#455056;">
                      Click the link below to reset your password. The link will expire in 5 minutes.
                  </p>
                  <a href="${process.env.BASE_URL || 'http://localhost:3000'}/reset?key=${key}"
                     style="background:#20e277; color:#fff; padding:10px 24px; border-radius:50px; text-decoration:none;">Reset Password</a>
              </td></tr>
              <tr><td style="text-align:center; color:rgba(69, 80, 86, 0.7);">
                  &copy; <strong>www.firefly.com</strong>
              </td></tr>
          </table>
      </body>
      </html>`;

    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('MAIL_USER'),
      to: recipients,
      subject,
      html: mainHtml,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { message: 'Email sent successfully' };
    } catch (error) {
      console.log('Error sending mail:', error);
      throw new Error('Failed to send reset email');
    }
  }

  async resetPassword(
    key: string,
    password1: string,
    password2: string,
  ): Promise<any> {
    if (!key) {
      throw new UnauthorizedException('Key is required');
    }
    if (!password1) {
      throw new UnauthorizedException('Password is required');
    }
    if (password1 !== password2) {
      throw new UnauthorizedException('Both passwords should match');
    }

    try {
      // Verify the JWT token
      const decoded = await this.jwtService.verifyAsync(key, {
        secret: process.env.JWT_SECRET,
      });

      const keyExist = await this.resetModel.findOne({
        email: decoded.email,
        key,
      });

      if (!keyExist) {
        throw new UnauthorizedException('Invalid or expired key');
      }

      // Delete the reset token after use
      await this.resetModel.deleteMany({ email: decoded.email });

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password1, 10);

      // Update the user password
      await this.userModel.updateOne(
        { email: decoded.email },
        { $set: { password: hashedPassword } },
      );
      return {
        message: 'Password updated successfully',
        data: { email: decoded.email },
        status: 201,
      };
    } catch (err) {
      throw new InternalServerErrorException(
        err.message || 'An error occurred during password reset',
      );
    }
  }
}
