import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
import { MailOptions } from './mail.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  private from = process.env.SMTP_USER;

  send(options: MailOptions) {
    const from = this.from;
    this.mailerService
      .sendMail({ from, ...options })
      .catch((e) => {
        throw new HttpException(
          JSON.stringify(e).toString(),
          401,
        );
      });
  }
}
