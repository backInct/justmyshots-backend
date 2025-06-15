import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UserRegistrationCommand } from '../application/use-cases/registration-user.usecase';
import { RegistrationUserInputDTO } from './input-dto/registration-user.input-dto';
import { UserQueryRepository } from '../infrastructure/query/user.query.repository';
import { RegistrationUserOutputDto } from './output-dto/registration-user.output-dto';
import { SETTINGS } from '../../../../common/settings/router.path.settings';
import { RegistrationConfirmationUserInputDto } from './input-dto/registration-confirmation-user.input-dto';
import { RegistrationConfirmationUserCommand } from '../application/use-cases/registration-confirmation-user.usecase';
import { LocalAuthGuard } from '../guards/local/local-auth.guard';
import { ExtractUserFromRequest } from '../../decorators/extract-user-from-request.decorator';
import { UserContextDTO } from '../../decorators/dto/user-context.dto';
import { CreateSessionCommand } from '../../sessions/application/use-cases/create-session.use-case';
import { LoginUserCommand } from '../application/use-cases/login-user.use-case';
import { Response } from 'express';
import { AccessTokenOutputDto } from './output-dto/login-user.output-dto';
import {
  ApiBadRequestCustomResponse,
  ApiUnauthorizedCustomResponse,
} from '../../../../common/swagger/bad-request.swagger';

@ApiTags('Authorization')
@Controller(SETTINGS.PATH.AUTH)
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  /**
   * Зарегистрировать пользователя
   */
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.OK)
  @Post('registration')
  @ApiBody({ type: RegistrationUserInputDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь успешно зарегистрирован',
    type: RegistrationUserOutputDto,
  })
  @ApiBadRequestCustomResponse()
  async registration(
    @Body() dto: RegistrationUserInputDTO,
  ): Promise<RegistrationUserOutputDto> {
    const userId: string =
      await this.commandBus.execute<UserRegistrationCommand>(
        new UserRegistrationCommand(dto),
      );
    return this.userQueryRepository.findUserById(userId);
  }

  /**
   * Подтвердить регистрацию
   */
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(ThrottlerGuard)
  @Post('registration-confirmation')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Пользователь подтвердил регистрацию',
  })
  @ApiBadRequestCustomResponse()
  async registrationConfirmation(
    @Body() dto: RegistrationConfirmationUserInputDto,
  ): Promise<void> {
    await this.commandBus.execute<RegistrationConfirmationUserCommand>(
      new RegistrationConfirmationUserCommand(dto),
    );
  }

  /**
   * Аутентифицировать пользователя в системе
   */
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AccessTokenOutputDto,
    description:
      'Возвращает в body - accessToken: string, в cookie - refreshToken: string',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        loginOrEmail: { type: 'string', example: 'login123' },
        password: { type: 'string', example: 'superpassword123' },
      },
    },
  })
  @ApiBadRequestCustomResponse()
  @ApiUnauthorizedCustomResponse()
  async loginUser(
    @ExtractUserFromRequest() user: UserContextDTO,
    @Res({ passthrough: true }) res: Response,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string | undefined,
  ): Promise<AccessTokenOutputDto> {
    const tokens = await this.commandBus.execute(
      new LoginUserCommand({ userId: user.userId }),
    );

    await this.commandBus.execute(
      new CreateSessionCommand({
        refreshToken: tokens.refreshToken,
        deviceName: userAgent ?? 'Not defined',
        ip: ip,
      }),
    );

    res.cookie('refreshToken', tokens.refreshToken, {
      secure: true,
      httpOnly: true,
    });

    return { accessToken: tokens.accessToken };
  }
}
