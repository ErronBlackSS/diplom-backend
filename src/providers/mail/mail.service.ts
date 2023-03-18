import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
import { MailOptions } from './mail.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  send(options: MailOptions) {
    this.mailerService.sendMail(options).catch((e) => {
      throw new HttpException(
        JSON.stringify(e).toString(),
        401,
      );
    });
  }
}
