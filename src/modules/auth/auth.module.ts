import { Module } from '@nestjs/common';
import { MailModule } from 'src/providers/mail/mail.module';
import { TokensModule } from 'src/providers/tokens/tokens.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [MailModule, TokensModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
