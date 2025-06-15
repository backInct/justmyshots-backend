import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SecurityRepository } from '../../infrastructure/security.repository';
import { DeviceId } from '../../domain/dto/session.dto';
import { UserId } from '../../../user/domain/dto/user.dto';

class DeleteAllUserSessionsExpectCurrentCommandDTO {
  userId: UserId;
  deviceId: DeviceId;
}

export class DeleteAllUserSessionsExpectCurrentCommand extends Command<void> {
  constructor(public dto: DeleteAllUserSessionsExpectCurrentCommandDTO) {
    super();
  }
}

@CommandHandler(DeleteAllUserSessionsExpectCurrentCommand)
export class DeleteAllUserSessionsExpectCurrentUseCase
  implements ICommandHandler<DeleteAllUserSessionsExpectCurrentCommand>
{
  constructor(private securityRepository: SecurityRepository) {}

  async execute({
    dto,
  }: DeleteAllUserSessionsExpectCurrentCommand): Promise<void> {
    await this.securityRepository.deleteAllUserSessionsExceptCurrent(
      dto.userId,
      dto.deviceId,
    );
  }
}
