import { SessionEntity } from '../../domain/session.entity';

export class SecurityOutputDto {
  ip: string;
  title: string;
  lastActiveDate: string;
  deviceId: string;

  static mapToView(security: SessionEntity): SecurityOutputDto {
    const dto = new SecurityOutputDto();

    dto.ip = security.ip;
    dto.title = security.deviceName;
    dto.lastActiveDate = security.lastActiveDate.toISOString();
    dto.deviceId = security.deviceId;

    return dto;
  }
}
