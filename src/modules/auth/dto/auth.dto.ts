import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Tokens, User } from '../auth';

export class AuthDto {
  @ApiProperty({
    description: 'Email пользователя',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RefreshDto {
  @ApiProperty({
    description: 'Refresh-token',
  })
  @IsNotEmpty()
  refreshToken: string;

  @ApiProperty({
    description: 'Id пользователя',
  })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'email пользователя',
  })
  @IsNotEmpty()
  email: string;
}

export class SignupResponse {
  @ApiProperty({
    description: 'Статус аккаута',
  })
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'Сообщение',
  })
  @IsNotEmpty()
  message: string;
}

export class RegisterResponse {
  @ApiProperty({
    description: 'Статус аккаута',
  })
  @IsNotEmpty()
  user: User;

  @ApiProperty({
    description: 'Статус аккаута',
  })
  @Type(() => TokenResponse)
  @IsNotEmpty()
  tokens: Tokens;
}

export class TokenResponse {
  @ApiProperty({
    description: 'access_token',
  })
  @IsString()
  access_token: string;

  @ApiProperty({
    description: 'refresh_token',
  })
  @IsString()
  refresh_token: string;
}

export class ActivationToken {
  @ApiProperty({
    description: 'Токен для активации аккаунта',
  })
  @IsUUID()
  @IsString()
  token: string;
}

export class LogoutDto {
  @ApiProperty({
    description: 'Refresh token пользователя',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @ApiProperty({
    description: 'id пользователя',
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
