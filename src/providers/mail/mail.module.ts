import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import {
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_USER,
} from 'src/constants/config.constants';
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>(SMTP_HOST),
          port: configService.get<string>(SMTP_PORT),
          secure: false,
          auth: {
            user: configService.get<string>(SMTP_USER),
            pass: configService.get<string>(SMTP_PASSWORD),
          },
          tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
          },
        },
        defaults: {
          from: 'infamoustopfer@gmail.com',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
