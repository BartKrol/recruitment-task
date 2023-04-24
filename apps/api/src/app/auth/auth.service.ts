import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginRequestDto, LoginResponseDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(payload): Promise<User> {
    const user = await this.userService.getUserById(payload.id);
    if (user !== undefined && user.email === payload.email) {
      return user;
    }
    throw new UnauthorizedException();
  }

  private createJwtPayload(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async login(loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userService.getUserByEmail(loginRequest.email);

    if (
      user === null ||
      user === undefined ||
      !bcrypt.compareSync(loginRequest.password, user.password)
    ) {
      throw new UnauthorizedException();
    }

    const payload = this.createJwtPayload(user);

    return { token: await this.jwtService.signAsync(payload) };
  }
}
