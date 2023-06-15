import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { API_URL } from 'src/constants/config.constants';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { convertToCourseResponse } from '../courses/dto/courses.dto';

@Injectable()
export class CatalogService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async getCatalog() {
    const catalog = await this.prisma.course.findMany({
      where: {
        published: true,
      },
      include: {
        CourseImage: {
          select: {
            path: true,
          },
        },
        modules: {
          include: {
            lessons: true,
            _count: {
              select: {
                lessons: true,
              },
            },
          },
        },
      },
    });

    let lessonsCount = 0;
    catalog.forEach((course) => {
      course.modules.forEach((_module) => {
        lessonsCount += _module._count.lessons;
      });
    });

    const flattenedCatalog = catalog.map((course) => ({
      id: course.id,
      name: course.name,
      imagePath: `${this.config.get(API_URL)}/${
        course.CourseImage.path
      }`,
      modulesCount: course.modules.length,
      lessonsCount: lessonsCount,
    }));

    return flattenedCatalog;
  }

  async getCoursePromo(courseId: number) {
    const promo = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        CourseImage: {
          select: {
            path: true,
          },
        },
      },
    });

    return convertToCourseResponse(promo);
  }
}
