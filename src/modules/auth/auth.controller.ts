import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
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
  LogoutDto,
} from './dto/auth.dto';
import { RefreshTokenGuard } from './guard/jwt.guard';
import { GetUser } from './decorator/get-user.decorator';
import { User } from './auth';

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
    @Req() req: Request,
  ): Promise<RegisterResponse> {
    return this.authService.register(data, req);
  }

  @ApiCreatedResponse({
    description: 'Логин',
    type: TokenResponse,
  })
  @Post('signin')
  signin(@Body() data: AuthDto, @Req() req: Request) {
    return this.authService.signin(data, req);
  }

  @ApiBadGatewayResponse({
    description: `Error: \n 
    'Invalid token', \n
    `,
  })
  @ApiCreatedResponse({
    description: 'Обновление токена',
    type: TokenResponse,
  })
  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshToken(
    @GetUser() user: User,
    @Query('refreshToken') refreshToken: string,
  ): Promise<TokenResponse> {
    return this.authService.refreshTokens({
      email: user.email,
      refreshToken: refreshToken,
      userId: user.id,
    });
  }

  @Patch('logout')
  @ApiCreatedResponse({
    description:
      'Выход из аккаунта, удаление предыдущей сессии',
  })
  async logout(@Body() dto: LogoutDto) {
    return this.authService.logout(dto);
  }
}
