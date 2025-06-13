import { Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/user.entity';
import { PrismaService } from '../../../prisma/service/prisma.service';

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
}
