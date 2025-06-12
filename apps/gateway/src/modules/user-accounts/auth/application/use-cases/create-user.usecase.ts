import { UserCreateDTO } from '../../../user/dto/create.user.dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BcryptService } from '../../services/bcrypt.service';
import { installGenerateEmailConfirmData } from '../../../user/utils/install.generate.email-confirmation.utils';
import { UserRepository } from '../../../user/infrastructure/user.repository';
import { UserEntity } from '../../../user/entity/user.entity';
import { UserEmailConfirmationEntity } from '../../../user/entity/user-email-confirmation.entity';
import { UserEmailConfirmationRepository } from '../../../user/infrastructure/email-confirmation.repository';
import { getCreateUserRTO } from '../../rto/get.create.user.rto';
import { EmailConfirmationCreateDTO } from '../../../user/dto/email-confirmation/email-confirmation.create.dto';

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

  async execute(command: CommonCreateUserCommand): Promise<getCreateUserRTO> {
    const hashPassword = await this.bcryptService.hashPassword(
      command.payload.password,
    );

    const user: UserEntity = UserEntity.createInstance(command.payload);

    user.installPassword(hashPassword);

    const userId: string = await this.userRepository.createUser(user);

    const userEmailConfirmationDTO: EmailConfirmationCreateDTO =
      installGenerateEmailConfirmData();

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
}
