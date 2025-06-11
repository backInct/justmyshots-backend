import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SETTINGS } from '../../../../common/controller.path.settings';
import { CommandBus } from '@nestjs/cqrs';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UserRegistrationCommand } from '../application/use-cases/registration-user.usecase';
import { UserRegistrationDTO } from '../dto/user.registration.dto';
import { UserQueryRepository } from '../../user/infrastructure/query/user.query.repository';
import { GetUserDataRTO } from '../interfaces/get.user.data';

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
  @ApiBody({ type: UserRegistrationDTO })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно зарегистрирован',
    type: GetUserDataRTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка валидации: неверные данные',
  })
  async registration(
    @Body() dto: UserRegistrationDTO,
  ): Promise<GetUserDataRTO> {
    const userId: string =
      await this.commandBus.execute<UserRegistrationCommand>(
        new UserRegistrationCommand(dto),
      );
    return this.userQueryRepository.findUserById(userId);
  }
}
