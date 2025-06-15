import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityRepository } from '../../infrastructure/security.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { DeviceId } from '../../domain/dto/session.dto';
import { SessionEntity } from '../../domain/session.entity';
import { UserId } from '../../../user/domain/dto/user.dto';

class DeleteUserSessionByDeviceIdCommandDTO {
  userId: UserId;
  deviceId: DeviceId;
  lastActiveDate: string;
}

export class DeleteUserSessionByDeviceIdCommand extends Command<void> {
  constructor(public dto: DeleteUserSessionByDeviceIdCommandDTO) {
    super();
  }
}

@CommandHandler(DeleteUserSessionByDeviceIdCommand)
export class DeleteUserSessionByDeviceIdUseCase
  implements ICommandHandler<DeleteUserSessionByDeviceIdCommand>
{
  constructor(private securityRepository: SecurityRepository) {}

  async execute({ dto }: DeleteUserSessionByDeviceIdCommand): Promise<void> {
    const session: SessionEntity | null =
      await this.securityRepository.findUserSessionByDeviceId(dto.deviceId);

    if (!session) throw new NotFoundException('session not found');

    if (!session.isBelongToUser(dto.userId)) {
      throw new ForbiddenException(
        'this user cannot delete sessions that are not his own',
      );
    }

    await this.securityRepository.deleteUserSessionByDeviceId(dto.deviceId);
  }
}
