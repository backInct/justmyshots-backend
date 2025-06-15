import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../domain/user.entity';
import { PrismaService } from '../../../prisma/service/prisma.service';
import { UserId } from '../domain/dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(entity: UserEntity): Promise<string> {
    const data = entity.toPrisma();

    const created = await this.prisma.user.create({
      data,
    });

    return created.id;
  }

  async deleteUser(user: UserEntity): Promise<string> {
    user.markDeleted();

    const updated = await this.prisma.user.update({
      where: { id: user.getId() },
      data: {
        deletedAt: user.getDeletedAt(),
      },
    });

    return updated.id;
  }

  async findUserByLoginOrEmail(
    loginOrEmail: string,
  ): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: loginOrEmail }, { username: loginOrEmail }],
        deletedAt: null,
      },
      //TODO реализовать агрегат рут
      // include: {
      //   emailConfirmation: true,
      // },
    });

    return user ? UserEntity.fromPrisma(user) : null;
  }

  async checkUserFoundAndNotDeletedOrNotFoundException(
    userId: UserId,
  ): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }
  }
}
