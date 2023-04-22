import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { User } from './user';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserInfo(
    userId: number,
    email: string,
  ): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
        email: email,
      },
      select: {
        id: true,
        email: true,
      },
    });
  }
}
