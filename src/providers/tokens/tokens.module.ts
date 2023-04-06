import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TokensService } from './tokens.service';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [ConfigModule],
  providers: [TokensService, JwtService],
  exports: [TokensService],
})
export class TokensModule {}
