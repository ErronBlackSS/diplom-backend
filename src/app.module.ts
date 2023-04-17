import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './providers/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './providers/mail/mail.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      cache: true,
    }),
    UserModule,
    PrismaModule,
    MailModule,
    AuthModule,
  ],
})
export class AppModule {}
