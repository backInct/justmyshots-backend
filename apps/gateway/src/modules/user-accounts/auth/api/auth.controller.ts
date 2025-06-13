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
}
