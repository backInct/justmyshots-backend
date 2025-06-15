import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityRepository } from '../../infrastructure/security.repository';
import { AuthService } from '../../../user/application/service/auth.service';
import { RefreshTokenPayloadDTO } from '../../../user/application/dto/tokens.dto';
import { SessionEntity } from '../../domain/session.entity';

class CreateSessionCommandDTO {
  refreshToken: string;
  deviceName: string;
  ip: string;
}

export class CreateSessionCommand extends Command<void> {
  constructor(public dto: CreateSessionCommandDTO) {
    super();
  }
}

@CommandHandler(CreateSessionCommand)
export class CreateSessionUseCase
  implements ICommandHandler<CreateSessionCommand>
{
  constructor(
    private securityRepository: SecurityRepository,
    private authService: AuthService,
  ) {}

  async execute({ dto }: CreateSessionCommand): Promise<void> {
    const payload: RefreshTokenPayloadDTO =
      this.authService.getRefreshTokenPayload(dto.refreshToken);

    const session: SessionEntity = SessionEntity.createSession({
      userId: payload.userId,
      deviceId: payload.deviceId,
      deviceName: dto.deviceName,
      ip: dto.ip,
      lastActiveDate: payload.lastActiveDate,
      expireAt: new Date(payload.exp * 1000).toISOString(),
    });

    await this.securityRepository.create(session);
  }
}
