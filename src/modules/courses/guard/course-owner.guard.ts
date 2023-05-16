import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UserInfo } from 'src/modules/user/user';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class CourseOwnerGuard implements CanActivate {
  constructor(public prisma: PrismaService) {}

  protected courseId: number;

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    if (!this.courseId) {
      return true;
    }

    const { user }: { user: UserInfo } = context
      .switchToHttp()
      .getRequest();

    const isUserOwner = await this.prisma.course.findFirst({
      where: {
        AND: [
          {
            id: this.courseId,
          },
          {
            creatorId: user.userId,
          },
        ],
      },
    });

    return !!isUserOwner;
  }
}
