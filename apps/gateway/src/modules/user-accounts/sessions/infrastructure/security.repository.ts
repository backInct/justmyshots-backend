import { Injectable } from '@nestjs/common';
import { DeviceId } from '../domain/dto/session.dto';
import { PrismaService } from '../../../prisma/service/prisma.service';
import { SessionEntity } from '../domain/session.entity';
import { UserId } from '../../user/domain/dto/user.dto';

@Injectable()
export class SecurityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteAllUserSessionsExceptCurrent(
    userId: UserId,
    deviceId: DeviceId,
  ): Promise<void> {
    await this.prisma.session.deleteMany({
      where: { userId: userId, NOT: { deviceId: deviceId } },
    });
  }

  async deleteUserSessionByDeviceId(deviceId: DeviceId): Promise<void> {
    await this.prisma.session.delete({ where: { deviceId: deviceId } });
  }

  async findUserSessionByDeviceId(
    deviceId: DeviceId,
  ): Promise<SessionEntity | null> {
    const prismaSession = await this.prisma.session.findUnique({
      where: { deviceId: deviceId },
    });

    return prismaSession ? SessionEntity.fromPrisma(prismaSession) : null;
  }

  async create(session: SessionEntity): Promise<void> {
    await this.prisma.session.create({
      data: session.toPrisma(),
    });
  }
}
