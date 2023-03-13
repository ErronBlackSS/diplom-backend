import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(signupData: AuthDto) {
    const { email, password } = signupData;

    return {
      access_token: 'xui',
      refresh_token: 'jopa',
    };
  }

  async signin(signinData: AuthDto) {}

  async logout() {}
}
