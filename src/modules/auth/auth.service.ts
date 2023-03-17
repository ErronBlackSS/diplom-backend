import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { AuthDto, SignupResponse } from './dto/auth.dto';
import { ForbiddenException } from '@nestjs/common';
import { EMAIL_USER_CONFLICT } from 'src/constants/errors.constants';
import * as argon from 'argon2';
import { VERIFICATION } from 'src/constants/account-status.constants';
import { MailService } from 'src/providers/mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { FRONTEND_URL } from 'src/constants/config.constants';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private config: ConfigService,
  ) {}

  async signup(
    signupData: AuthDto,
  ): Promise<SignupResponse> {
    const { email, password } = signupData;

    const testUser = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (testUser) {
      throw new ForbiddenException(EMAIL_USER_CONFLICT);
    }

    const hash = await argon.hash(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        hash,
      },
    });

    const code = uuidv4();

    this.prisma.emailVerification.upsert({
      where: {
        email: email,
      },
      update: {
        code,
        hash,
      },
      create: {
        email,
        hash,
        code,
      },
    });
    // Далее ждем подтверждения по почте
    this.sendEmailVerification(email);

    return {
      email: user.email,
      status: VERIFICATION,
    };
  }

  private async sendEmailVerification(email: string) {
    const activation_link = `${this.config.get<string>(
      FRONTEND_URL,
    )}/confirm?email=${email}`;
    await this.mailService.send({
      to: email,
      subject: 'Регистрация в сервисе',
      template: './email_verification.hbs',
      context: {
        email,
        activation_link,
      },
    });
  }
}
