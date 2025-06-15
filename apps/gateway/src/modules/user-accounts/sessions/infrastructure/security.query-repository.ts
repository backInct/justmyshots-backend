import { Injectable } from '@nestjs/common';
import { SecurityOutputDto } from '../api/output-dto/security.output-dto';
import { PrismaService } from '../../../prisma/service/prisma.service';
import { SessionEntity } from '../domain/session.entity';
import { DeviceId } from '../domain/dto/session.dto';
import { UserId } from '../../user/domain/dto/user.dto';

@Injectable()
export class SecurityQueryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllActiveUserSessions(userId: UserId): Promise<SecurityOutputDto[]> {
    const sessions = await this.prisma.session.findMany({
      where: {
        userId: userId,
        expireAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return sessions.map((session) =>
      SecurityOutputDto.mapToView(SessionEntity.fromPrisma(session)),
    );
  }

  async isSessionByDeviceIdAndLastActiveDateFound(
    deviceId: DeviceId,
    lastActiveDate: string,
  ): Promise<boolean> {
    const session = await this.prisma.session.findUnique({
      where: {
        deviceId: deviceId,
        lastActiveDate: lastActiveDate,
      },
      select: {
        id: true,
      },
    });

    return !!session;
  }
}
