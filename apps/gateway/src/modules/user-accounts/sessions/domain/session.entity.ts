import { Session } from 'apps/gateway/prisma/generated';
import {
  CreateSessionDTO,
  DeviceId,
  UpdateSessionDTO,
} from './dto/session.dto';

export class SessionEntity {
  id: string;
  deviceId: DeviceId;
  deviceName: string;
  ip: string;
  lastActiveDate: Date;
  expireAt: Date;
  createdAt: Date;
  userId: string;

  static createSession(dto: CreateSessionDTO): SessionEntity {
    const session = new this();

    session.deviceId = dto.deviceId;
    session.userId = dto.userId;
    session.deviceName = dto.deviceName;
    session.ip = dto.ip;
    session.lastActiveDate = new Date(dto.lastActiveDate);
    session.expireAt = new Date(dto.expireAt);
    session.createdAt = new Date();

    return session;
  }

  public static fromPrisma(data: Session): SessionEntity {
    const session = new this();

    session.id = data.id.toString();
    session.deviceId = data.deviceId;
    session.deviceName = data.deviceName;
    session.ip = data.ip;
    session.lastActiveDate = data.lastActiveDate;
    session.expireAt = data.expireAt;
    session.createdAt = data.createdAt;
    session.userId = data.userId;

    return session;
  }

  //TODO: доработать
  public toPrisma() {
    return {
      // id: this.id ? BigInt(this.id) : undefined,
      deviceId: this.deviceId,
      deviceName: this.deviceName,
      ip: this.ip,
      lastActiveDate: this.lastActiveDate,
      expireAt: this.expireAt,
      createdAt: this.createdAt,
      user: {
        connect: {
          id: this.userId,
        },
      },
    };
  }

  updateSession(dto: UpdateSessionDTO): void {
    this.lastActiveDate = new Date(dto.lastActiveDate);
    this.expireAt = new Date(dto.expireAt);
  }

  isBelongToUser(userId: string): boolean {
    return this.userId === userId;
  }
}
