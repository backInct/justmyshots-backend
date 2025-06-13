import { PrismaService } from '../../../prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserEmailConfirmationEntity } from '../domain/user-email-confirmation.entity';

@Injectable()
export class UserEmailConfirmationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createEmailConfirmationToUser(
    entity: UserEmailConfirmationEntity,
  ): Promise<{ confirmationCode: string }> {
    const created = await this.prismaService.userEmailConfirmation.create({
      data: entity.toPrisma(),
    });

    return {
      confirmationCode: created.code,
    };
  }

  async findEmailConfirmation(
    userId: string,
  ): Promise<UserEmailConfirmationEntity | null> {
    const data = await this.prismaService.userEmailConfirmation.findUnique({
      where: { userId },
    });

    if (!data) {
      return null;
    }

    return UserEmailConfirmationEntity.fromPrisma(data);
  }

  async findByEmailConfirmationCode(
    code: string,
  ): Promise<UserEmailConfirmationEntity | null> {
    const data = await this.prismaService.userEmailConfirmation.findUnique({
      where: { code },
    });

    if (!data) {
      return null;
    }

    return UserEmailConfirmationEntity.fromPrisma(data);
  }

  async updateEmailConfirmation(
    entity: UserEmailConfirmationEntity,
  ): Promise<void> {
    await this.prismaService.userEmailConfirmation.update({
      where: {
        id: entity.getId(),
      },
      data: {
        verification: entity.verification,
        expiresAt: entity.expiresAt,
      },
    });
  }
}
