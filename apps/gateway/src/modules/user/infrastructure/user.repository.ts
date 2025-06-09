import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(entity: UserEntity) {
    const result = entity.toPrisma();

    const saved = await this.prisma.user.upsert({
      where: { id: result.getId() ?? '' },
      update: result,
      create: result,
    });

    return UserEntity.fromPrisma(saved);
  }

  async createUser(dto: any) {
    const user = UserEntity.createInstance(dto);
    return this.save(user);
  }
}
