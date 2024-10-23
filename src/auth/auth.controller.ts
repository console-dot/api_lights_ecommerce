import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { Public } from './constants';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Post('signin')
  async signIn(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.signIn(
      body.email,
      body.password,
    );

    // Optionally set the refresh token in a secure cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // Prevent access from JavaScript
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return res.status(200).json({ accessToken, refreshToken, user });
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(
    @Body() body: { refreshToken: string },
    @Res() res: Response,
  ) {
    const { accessToken } = await this.authService.refreshAccessToken(
      body.refreshToken,
    );
    return res.status(200).json({ accessToken });
  }
}
