import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { AuthDto, SignupResponse } from './dto/auth.dto';
import { ForbiddenException } from '@nestjs/common';
import { EMAIL_USER_CONFLICT } from 'src/constants/errors.constants';
import * as argon from 'argon2';
import { VERIFICATION } from 'src/constants/account-status.constants';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(
    signupData: AuthDto,
  ): Promise<SignupResponse> {
    const { email, password } = signupData;

    const testUser = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!testUser) {
      throw new ForbiddenException(EMAIL_USER_CONFLICT);
    }

    const hash = await argon.hash(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        hash,
      },
    });

    // Далее ждем подтверждения по почте

    return {
      email: user.email,
      status: VERIFICATION,
    };
  }

  async signin(signinData: AuthDto) {}

  async logout() {}
}
