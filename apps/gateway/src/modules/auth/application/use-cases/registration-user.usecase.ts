import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class UserRegistrationCommand {
  constructor(public readonly payload: any) {}
}

@CommandHandler(UserRegistrationCommand)
export class RegistrationUserUseCase
  implements ICommandHandler<UserRegistrationCommand>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(command: UserRegistrationCommand): Promise<void> {
    // // проверяю существует ли юзер, даже если он удален!
    // const existingUser = await this.userRepository.findCheckExistUserEntity(command.payload.login, command.payload.email);
    //
    // if (existingUser) {
    //     throw BadRequestDomainException.create(
    //         'такой юзер уже существует!',
    //         existingUser.login === command.payload.login ? 'login' : 'email',
    //     );
    // }
    //
    // // создаю юзера
    // const emailConfirmation = await this.commandBus.execute<CommonCreateUserCommand, { userId: number; confirmationCode: string }>(
    //     new CommonCreateUserCommand(command.payload),
    // );
    //
    // const user: User = await this.userRepository.findUserById(String(emailConfirmation.userId));
    //
    // this.mailer
    //     .sendEmailRecoveryMessage(command.payload.email, emailConfirmation.confirmationCode)
    //     .then(() => {
    //         this.userRepository.updateUserConfirmedSendEmail(user);
    //     })
    //     .catch((err: unknown) => {
    //         console.log(err);
    //     });
  }
}
