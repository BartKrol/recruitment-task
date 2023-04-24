import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginRequestDto, LoginResponseDto } from './dtos';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() payload: LoginRequestDto
  ): Promise<LoginResponseDto> {
    const login = await this.authService.login(payload);
    return login;
  }
}
