import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/providers/mail/mail.module';
import { TokensModule } from 'src/providers/tokens/tokens.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  JwtStrategy,
  RefreshTokenStrategy,
} from './strategy/jwt-strategy';

@Module({
  imports: [
    JwtModule.register({}),
    MailModule,
    TokensModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
