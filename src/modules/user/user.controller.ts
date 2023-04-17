import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UserResponse } from './dto/user.dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiOkResponse({
    description: 'Получить себя',
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: `401: Unauthorized`,
  })
  async getMe(
    @GetUser()
    user: User,
  ) {
    return this.userService.getUserInfo(
      user.id,
      user.email,
    );
  }
}
