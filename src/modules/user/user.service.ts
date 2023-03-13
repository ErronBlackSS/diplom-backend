import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findBy(field: string, value: string) {
    return this.prisma.user.findFirst({
      where: {
        [field]: value,
      },
    });
  }
}
