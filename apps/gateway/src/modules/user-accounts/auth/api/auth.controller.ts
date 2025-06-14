import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UserRegistrationCommand } from '../application/use-cases/registration-user.usecase';
import { RegistrationUserInputDTO } from './input-dto/registration-user.input-dto';
import { UserQueryRepository } from '../../user/infrastructure/query/user.query.repository';
import { RegistrationUserOutputDto } from './output-dto/registration-user.output-dto';
import { SETTINGS } from '../../../../common/settings/router.path.settings';
import { RegistrationConfirmationUserInputDto } from './input-dto/registration-confirmation-user.input-dto';
import { RegistrationConfirmationUserCommand } from '../application/use-cases/registration-confirmation-user.usecase';
import { ResendEmailUserInputDTO } from './input-dto/resend-email-user.input-dto';

@ApiTags('Authorization')
@Controller(SETTINGS.PATH.AUTH)
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.OK)
  @Post('registration')
  @ApiBody({ type: RegistrationUserInputDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь успешно зарегистрирован',
    type: RegistrationUserOutputDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка валидации: неверные данные',
  })
  async registration(
    @Body() dto: RegistrationUserInputDTO,
  ): Promise<RegistrationUserOutputDto> {
    const userId: string =
      await this.commandBus.execute<UserRegistrationCommand>(
        new UserRegistrationCommand(dto),
      );
    return this.userQueryRepository.findUserById(userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ThrottlerGuard)
  @Post('registration-confirmation')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Пользователь подтвердил регистрацию',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Ошибка валидации: неверные данные',
  })
  async registrationConfirmation(
    @Body() dto: RegistrationConfirmationUserInputDto,
  ): Promise<void> {
    await this.commandBus.execute<RegistrationConfirmationUserCommand>(
      new RegistrationConfirmationUserCommand(dto),
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ThrottlerGuard)
  @Post('resend-email')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Код подтверждения был отправлен на указанную почту',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Данный email уже был подтвержден',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Данный email отсутствует',
  })
  async resendEmailConfirmationCode(
    @Body() dto: ResendEmailUserInputDTO,
  ): Promise<void> {}
}
