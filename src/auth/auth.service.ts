import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }
  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.login(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Step 2: Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { sub: user.email, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
