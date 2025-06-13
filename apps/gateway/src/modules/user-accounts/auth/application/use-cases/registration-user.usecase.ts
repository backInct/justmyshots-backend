import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegistrationUserInputDTO } from '../../api/input-dto/registration-user.input-dto';
import { BadRequestException } from '@nestjs/common';
import { UserUniqueCommand } from './unique-user.usecase';
import { CommonCreateUserCommand } from './create-user.usecase';
import { EmailService } from '../../../../email/service/email.service';
import { CreateUserOutputDTO } from '../../api/output-dto/create-user.output-dto';

export class UserRegistrationCommand {
  constructor(public readonly dto: RegistrationUserInputDTO) {}
}

@CommandHandler(UserRegistrationCommand)
export class RegistrationUserUseCase
  implements ICommandHandler<UserRegistrationCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly emailService: EmailService,
  ) {}

  async execute(command: UserRegistrationCommand): Promise<string> {
    const isUserUnique: { email: string; username: string } | null =
      await this.commandBus.execute(
        new UserUniqueCommand(command.dto.email, command.dto.username),
      );

    if (isUserUnique) {
      const errorField =
        command.dto.username === isUserUnique.username ? 'username' : 'email';
      throw new BadRequestException([
        {
          field: errorField,
          message: `${errorField} должен быть уникальным.`,
        },
      ]);
    }

    const { email, confirmationCode, userId }: CreateUserOutputDTO =
      await this.commandBus.execute<
        CommonCreateUserCommand,
        CreateUserOutputDTO
      >(new CommonCreateUserCommand(command.dto));

    this.emailService.registration(email, confirmationCode);

    return userId;
  }
}
