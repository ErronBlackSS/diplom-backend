import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, TokenResponse } from './dto/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'Регистрация',
    type: TokenResponse,
  })
  @Post('singup')
  signup(@Body() data: AuthDto): Promise<TokenResponse> {
    return this.authService.signup(data);
  }

  @ApiCreatedResponse({
    description: 'Авторизация',
    type: TokenResponse,
  })
  @Post('singin')
  signin(@Body() data: AuthDto): Promise<TokenResponse> {
    return this.authService.signin(data);
  }

  @ApiCreatedResponse({
    description: 'Выход из аккаунта',
    type: TokenResponse,
  })
  @Post('logout')
  async logout(
    @Body('token') refreshToken: string,
  ): Promise<{ success: true }> {
    await this.authService.logout(refreshToken);
    return { success: true };
  }
}
