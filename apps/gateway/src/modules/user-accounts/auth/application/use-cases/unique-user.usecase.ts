import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserQueryRepository } from '../../../user/infrastructure/query/user.query.repository';

export class UserUniqueCommand {
  constructor(
    public readonly email: string,
    public readonly username: string,
  ) {}
}

@CommandHandler(UserUniqueCommand)
export class UniqueUserUseCase implements ICommandHandler<UserUniqueCommand> {
  constructor(private readonly userQueryRepository: UserQueryRepository) {}

  async execute(
    command: UserUniqueCommand,
  ): Promise<{ email: string; username: string } | null> {
    return await this.userQueryRepository.existsByUserEmailOrUsername(
      command.email,
      command.username,
    );
  }
}
