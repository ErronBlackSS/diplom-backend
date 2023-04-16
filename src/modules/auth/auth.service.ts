import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import {
  ActivationToken,
  AuthDto,
  RegisterResponse,
  SignupResponse,
  TokenResponse,
} from './dto/auth.dto';
import { ForbiddenException } from '@nestjs/common';
import {
  CREDENTIALS_INCORRECT,
  EMAIL_USER_CONFLICT,
  EMAIL_VERIFICATION_CONFLICT,
  INVALID_ACTIVATION_TOKEN,
} from 'src/constants/errors.constants';
import * as argon from 'argon2';
import { VERIFICATION } from 'src/constants/account-status.constants';
import { MailService } from 'src/providers/mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import {
  FRONTEND_URL,
  REFRESH_TOKEN_SECRET,
} from 'src/constants/config.constants';
import { TokensService } from 'src/providers/tokens/tokens.service';
import { UAParser } from 'ua-parser-js';
import { JwtService } from '@nestjs/jwt';
import { DecodedRefreshToken } from './auth';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private config: ConfigService,
    private tokensService: TokensService,
    private jwt: JwtService,
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
    const code = uuidv4();

    try {
      await this.prisma.emailVerification.upsert({
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
      await this.sendEmailVerification(email, code);

      return {
        status: VERIFICATION,
        message: 'need email verification',
      };
    } catch (error) {
      await this.prisma.emailVerification.delete({
        where: {
          email: email,
        },
      });

      throw new ForbiddenException(
        EMAIL_VERIFICATION_CONFLICT,
      );
    }
  }

  async signin(data: AuthDto, req: Request) {
    const { email, password } = data;

    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ForbiddenException(CREDENTIALS_INCORRECT);
    }

    const pwMatches = await argon.verify(
      user.hash,
      password,
    );

    if (!pwMatches) {
      throw new ForbiddenException(CREDENTIALS_INCORRECT);
    }

    const ua = UAParser(req.headers['user-agent']);

    const tokens = await this.generateTokens(
      user.id,
      user.email,
      ua,
      req,
    );

    return tokens;
  }

  async register(
    data: ActivationToken,
    req: Request,
  ): Promise<RegisterResponse> {
    const { token } = data;

    const emailVerification =
      await this.prisma.emailVerification.findFirst({
        where: {
          code: token,
        },
      });

    if (!emailVerification) {
      throw new ForbiddenException(
        INVALID_ACTIVATION_TOKEN,
      );
    }

    const { email, hash } = emailVerification;

    const user = await this.prisma.user.create({
      data: {
        email: email,
        hash: hash,
      },
    });

    this.prisma.emailVerification.delete({
      where: {
        email: user.email,
      },
    });

    const ua = UAParser(req.headers['user-agent']);

    const tokens = await this.generateTokens(
      user.id,
      user.email,
      ua,
      req,
    );

    return {
      user,
      tokens,
    };
  }

  private async sendEmailVerification(
    email: string,
    token: string,
  ) {
    const activation_link = `${this.config.get<string>(
      FRONTEND_URL,
    )}/confirm?token=${token}`;
    this.mailService.send({
      to: email,
      subject: 'Регистрация в сервисе',
      template: './email_verification.hbs',
      context: {
        email,
        activation_link,
      },
    });
  }

  private async generateTokens(
    userId: number,
    email: string,
    parsedUA,
    req,
  ): Promise<TokenResponse> {
    const tokens = await this.signTokens(userId, email);

    const hashedRefreshToken = await argon.hash(
      tokens.refresh_token,
    );

    const ip =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress;

    const decodeRefresh: DecodedRefreshToken =
      this.jwt.verify(tokens.refresh_token, {
        secret: this.config.get<string>(
          REFRESH_TOKEN_SECRET,
        ),
      });

    const expiredDate: Date = new Date(
      Number(decodeRefresh.exp) * 1000,
    );

    await this.prisma.refreshToken.create({
      data: {
        user: { connect: { id: userId } },
        token: hashedRefreshToken,
        os: parsedUA.os.name,
        browser: parsedUA.browser.name,
        ip,
        device: parsedUA.device.type,
        vendor: parsedUA.device.vendor,
        ua: parsedUA.ua,
        expiredDate,
      },
    });

    return tokens;
  }

  async signTokens(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    return this.tokensService.signJwt(payload);
  }
}
