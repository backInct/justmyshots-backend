import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserId } from '../../domain/dto/user.dto';
import { randomUUID } from 'crypto';
import { AccessAndRefreshTokensDTO } from '../dto/tokens.dto';
import { AuthService } from '../service/auth.service';
import { UserRepository } from '../../infrastructure/user.repository';

class LoginUserCommandDTO {
  userId: UserId;
}

export class LoginUserCommand extends Command<AccessAndRefreshTokensDTO> {
  constructor(public dto: LoginUserCommandDTO) {
    super();
  }
}

@CommandHandler(LoginUserCommand)
export class LoginUserUseCase implements ICommandHandler<LoginUserCommand> {
  constructor(
    private authService: AuthService,
    private usersRepository: UserRepository,
  ) {}

  async execute({ dto }: LoginUserCommand): Promise<AccessAndRefreshTokensDTO> {
    await this.usersRepository.checkUserFoundAndNotDeletedOrNotFoundException(
      dto.userId,
    );

    const deviceId: string = randomUUID();

    const tokens: AccessAndRefreshTokensDTO = this.authService.createTokens(
      dto.userId,
      deviceId,
    );

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
