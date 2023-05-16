import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CourseOwnerGuard } from 'src/modules/courses/guard/course-owner.guard';

@Injectable()
export class ModuleOwnerGuard
  extends CourseOwnerGuard
  implements CanActivate
{
  constructor(public prisma: PrismaService) {
    super(prisma);
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const moduleId = Number(request.params['moduleId']);
    if (!moduleId) {
      return true;
    }

    const course = await this.prisma.courseModule.findFirst(
      {
        where: {
          id: moduleId,
        },
        include: {
          course: {
            select: {
              id: true,
            },
          },
        },
      },
    );

    super.courseId = course.courseId;

    return super.canActivate(context);
  }
}
