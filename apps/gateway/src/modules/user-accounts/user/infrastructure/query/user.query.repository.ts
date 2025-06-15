import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/service/prisma.service';
import { RegistrationUserOutputDto } from '../../api/output-dto/registration-user.output-dto';

@Injectable()
export class UserQueryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async existsByUserEmailOrUsername(
    email: string,
    username: string,
  ): Promise<{ email: string; username: string } | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
      select: { email: true, username: true },
    });
  }

  async findUserById(userId: string): Promise<RegistrationUserOutputDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
