import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserResponse {
  @ApiProperty({
    description: 'id пользователя',
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'email пользователя',
  })
  @IsString()
  email: string;
}
