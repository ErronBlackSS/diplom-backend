import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

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

export class SignupResponse {
  @ApiProperty({
    description: 'Email пользователя',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Статус аккаута',
  })
  @IsNotEmpty()
  status: string;
}

export class TokenResponse {
  @ApiProperty({
    description: 'access_token',
  })
  access_token: string;

  @ApiProperty({
    description: 'refresh_token',
  })
  refresh_token: string;
}
