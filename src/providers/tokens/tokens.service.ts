import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokensService {
  constructor(private configService: ConfigService) {}
}
