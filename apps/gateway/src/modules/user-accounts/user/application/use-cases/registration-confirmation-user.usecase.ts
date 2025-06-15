import { RegistrationConfirmationUserInputDto } from '../../api/input-dto/registration-confirmation-user.input-dto';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEmailConfirmationRepository } from '../../infrastructure/email-confirmation.repository';
import { BadRequestException } from '@nestjs/common';
import { UserEmailConfirmationEntity } from '../../domain/user-email-confirmation.entity';

export class RegistrationConfirmationUserCommand {
  constructor(public readonly dto: RegistrationConfirmationUserInputDto) {}
}

@CommandHandler(RegistrationConfirmationUserCommand)
export class RegistrationConfirmationUserUseCase
  implements ICommandHandler<RegistrationConfirmationUserCommand>
{
  constructor(
    private readonly emailConfirmationRepository: UserEmailConfirmationRepository,
  ) {}

  async execute(command: RegistrationConfirmationUserCommand): Promise<void> {
    const userEmailConfirmation: UserEmailConfirmationEntity | null =
      await this.emailConfirmationRepository.findByEmailConfirmationCode(
        command.dto.code,
      );

    if (!userEmailConfirmation) {
      throw new BadRequestException([
        {
          field: 'code',
          message: 'Incorrect code',
        },
      ]);
    }

    if (!userEmailConfirmation.canConfirmEmail()) {
      throw new BadRequestException([
        {
          message: 'Code to confirmation is expires or was confirmed',
          field: 'code',
        },
      ]);
    }

    userEmailConfirmation.confirmEmail(command.dto.code);

    await this.emailConfirmationRepository.updateEmailConfirmation(
      userEmailConfirmation,
    );
  }
}
