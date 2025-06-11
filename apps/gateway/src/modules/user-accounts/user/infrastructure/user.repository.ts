import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { PrismaService } from '../../../prisma/prisma.service';

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
      where: { id: user.getId()! },
      data: {
        deletedAt: user.getDeletedAt(), // или user.getDeletedAt(), если есть геттер
      },
    });

    return updated.id;
  }

  async findUserById(userId: string): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserEntity.fromPrisma(user);
  }
}
