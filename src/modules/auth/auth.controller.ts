import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  AuthDto,
  SignupResponse,
  TokenResponse,
  ActivationToken,
  RegisterResponse,
} from './dto/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'Регистрация',
    type: SignupResponse,
  })
  @Post('signup')
  signup(@Body() data: AuthDto): Promise<SignupResponse> {
    return this.authService.signup(data);
  }

  @ApiCreatedResponse({
    description: 'Активация аккаунта',
    type: TokenResponse,
  })
  @Post('register')
  register(
    @Body() data: ActivationToken,
  ): Promise<RegisterResponse> {
    return this.authService.register(data);
  }

  @Get('me')
  getme() {
    return { name: 'Mihail', tovt: 'SecondName' };
  }
  // @ApiCreatedResponse({
  //   description: 'Авторизация',
  //   type: TokenResponse,
  // })
  // @Post('singin')
  // signin(@Body() data: AuthDto): Promise<TokenResponse> {
  //   return this.authService.signin(data);
  // }

  // @ApiCreatedResponse({
  //   description: 'Выход из аккаунта',
  //   type: TokenResponse,
  // })
  // @Post('logout')
  // async logout(
  //   @Body('token') refreshToken: string,
  // ): Promise<{ success: true }> {
  //   await this.authService.logout(refreshToken);
  //   return { success: true };
  // }
}
