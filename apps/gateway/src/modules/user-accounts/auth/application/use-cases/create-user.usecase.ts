import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BcryptService } from '../service/bcrypt.service';
import { UserRepository } from '../../../user/infrastructure/user.repository';
import { UserEntity } from '../../../user/domain/user.entity';
import { UserEmailConfirmationEntity } from '../../../user/domain/user-email-confirmation.entity';
import { UserEmailConfirmationRepository } from '../../../user/infrastructure/email-confirmation.repository';
import { CreateUserOutputDTO } from '../../api/output-dto/create-user.output-dto';
import { randomUUID } from 'node:crypto';
import { add } from 'date-fns';

class UserCreateDTO {
  email: string;
  username: string;
  password: string;
}

export class EmailConfirmationCreateDTO {
  code: string;
  expiresAt: Date;
  verification?: boolean;
}

export class CommonCreateUserCommand {
  constructor(public readonly payload: UserCreateDTO) {}
}

@CommandHandler(CommonCreateUserCommand)
export class CommonCreateUserUseCase
  implements ICommandHandler<CommonCreateUserCommand>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailConfirmationRepository: UserEmailConfirmationRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async execute(
    command: CommonCreateUserCommand,
  ): Promise<CreateUserOutputDTO> {
    const hashPassword = await this.bcryptService.hashPassword(
      command.payload.password,
    );

    const user: UserEntity = UserEntity.createInstance(command.payload);

    user.installPassword(hashPassword);

    const userId: string = await this.userRepository.createUser(user);

    const userEmailConfirmationDTO: EmailConfirmationCreateDTO =
      this.installGenerateEmailConfirmData();

    const emailConfirmation: UserEmailConfirmationEntity =
      UserEmailConfirmationEntity.buildInstance(
        userEmailConfirmationDTO,
        userId,
      );

    const { confirmationCode } =
      await this.emailConfirmationRepository.createEmailConfirmationToUser(
        emailConfirmation,
      );

    return {
      userId,
      email: user.getEmail(),
      confirmationCode,
    };
  }

  private installGenerateEmailConfirmData(): EmailConfirmationCreateDTO {
    const code: string = randomUUID();
    return {
      code,
      expiresAt: add(new Date(), { hours: 1, minutes: 30, seconds: 10 }),
      verification: false,
    };
  }
}
