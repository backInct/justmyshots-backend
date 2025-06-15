import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityRepository } from '../../infrastructure/security.repository';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../../user/application/service/auth.service';
import { RefreshTokenPayloadDTO } from '../../../user/application/dto/tokens.dto';
import { SessionEntity } from '../../domain/session.entity';

class UpdateUserSessionCommandDTO {
  refreshToken: string;
}

export class UpdateUserSessionCommand extends Command<void> {
  constructor(public dto: UpdateUserSessionCommandDTO) {
    super();
  }
}

@CommandHandler(UpdateUserSessionCommand)
export class UpdateUserSessionUseCase
  implements ICommandHandler<UpdateUserSessionCommand>
{
  constructor(
    private securityRepository: SecurityRepository,
    private authService: AuthService,
  ) {}

  async execute({ dto }: UpdateUserSessionCommand): Promise<void> {
    const refreshTokenPayload: RefreshTokenPayloadDTO =
      this.authService.getRefreshTokenPayload(dto.refreshToken);

    const session: SessionEntity | null =
      await this.securityRepository.findUserSessionByDeviceId(
        refreshTokenPayload.deviceId,
      );

    if (!session) {
      throw new UnauthorizedException('session not found');
    }

    session.updateSession({
      lastActiveDate: refreshTokenPayload.lastActiveDate,
      expireAt: new Date(refreshTokenPayload.exp * 1000).toISOString(),
    });

    await this.securityRepository.create(session);
  }
}
