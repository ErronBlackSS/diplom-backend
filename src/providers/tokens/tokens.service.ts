import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signJwt(payload): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const secret = this.config.get('JWT_SECRET');
    const refreshSecret = this.config.get(
      'REFRESH_TOKEN_SECRET',
    );

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: secret,
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '180d',
      secret: refreshSecret,
    });

    return {
      access_token: token,
      refresh_token: refreshToken,
    };
  }
}
