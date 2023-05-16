import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { CourseOwnerGuard } from 'src/modules/courses/guard/course-owner.guard';

@Injectable()
export class LessonOwnerGuard
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

    const lessonId = Number(request.params['lessonId']);
    if (!lessonId) {
      return true;
    }

    const course = await this.prisma.moduleLesson.findFirst(
      {
        where: {
          id: lessonId,
        },
        include: {
          module: {
            include: {
              course: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    );

    super.courseId = course.module.courseId;

    return super.canActivate(context);
  }
}
