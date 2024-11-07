/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.login(email);
    if (!user) {
      throw new UnauthorizedException('Email not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong password');
    }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await this.generateTokens(user);

    // Optionally save the refreshToken in your database or return it in a cookie
    await this.usersService.updateRefreshToken(user, refreshToken);

    return {
      accessToken,
      refreshToken, // Store this securely on the client-side
      user,
    };
  }

  async generateTokens(user: any) {
    const payload = { sub: user._id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d', // Access token expiration
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d', // Refresh token expiration
    });

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(oldToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(oldToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user || user.refreshToken !== oldToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const { accessToken, refreshToken } = await this.generateTokens(user);
      return { accessToken, refreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
