import { PrismaService } from '../../../prisma/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserEmailConfirmationEntity } from '../entity/user-email-confirmation.entity';

@Injectable()
export class UserEmailConfirmationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createEmailConfirmationToUser(entity: UserEmailConfirmationEntity) {
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

  async findCodeToEmailRegistration(
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
}
