import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}

  async getCatalog() {
    const catalog = await this.prisma.course.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return catalog;
  }
}
