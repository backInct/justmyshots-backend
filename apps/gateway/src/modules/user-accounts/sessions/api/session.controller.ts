import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SecurityQueryRepository } from '../infrastructure/security.query-repository';
import { SecurityOutputDto } from './output-dto/security.output-dto';
import { CommandBus } from '@nestjs/cqrs';
import { DeleteAllUserSessionsExpectCurrentCommand } from '../application/use-cases/delete-all-user-sessions-expect-current.use-case';
import { DeleteUserSessionByDeviceIdCommand } from '../application/use-cases/delete-user-session-by-device-id.use-case';
import { ApiCookieAuth } from '@nestjs/swagger';
import { RefreshTokenPayloadDTO } from '../../user/application/dto/tokens.dto';
import { ExtractUserFromRequest } from '../../decorators/extract-user-from-request.decorator';
import { DeviceId } from '../domain/dto/session.dto';
import { RefreshTokenAuthGuard } from '../../user/guards/cookie/refresh-token.guard';
import {
  ApiForbiddenCustomResponse,
  ApiNotFoundCustomResponse,
  ApiUnauthorizedCustomResponse,
} from '../../../../common/swagger/bad-request.swagger';

@ApiCookieAuth()
@Controller('sessions')
export class SessionController {
  constructor(
    private securityQueryRepository: SecurityQueryRepository,
    private commandBus: CommandBus,
  ) {}

  /**
   * Получить все активные сессии
   */
  @Get('devices')
  @UseGuards(RefreshTokenAuthGuard)
  @ApiUnauthorizedCustomResponse()
  async getAllActiveUserSessions(
    @ExtractUserFromRequest() refreshTokenPayload: RefreshTokenPayloadDTO,
  ): Promise<SecurityOutputDto[]> {
    return await this.securityQueryRepository.getAllActiveUserSessions(
      refreshTokenPayload.userId,
    );
  }

  /**
   * Удалить все сессии, кроме текущей
   */
  @Delete('devices')
  @UseGuards(RefreshTokenAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedCustomResponse()
  async deleteAllUserSessionsExpectCurrent(
    @ExtractUserFromRequest() refreshTokenPayload: RefreshTokenPayloadDTO,
  ): Promise<void> {
    await this.commandBus.execute(
      new DeleteAllUserSessionsExpectCurrentCommand({
        userId: refreshTokenPayload.userId,
        deviceId: refreshTokenPayload.deviceId,
      }),
    );
  }

  /**
   * Удалить сессию по id
   */
  @Delete('devices/:deviceId')
  @UseGuards(RefreshTokenAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedCustomResponse()
  @ApiNotFoundCustomResponse()
  @ApiForbiddenCustomResponse()
  async deleteUserSessionByDeviceId(
    @Param('deviceId') deviceId: DeviceId,
    @ExtractUserFromRequest() refreshTokenPayload: RefreshTokenPayloadDTO,
  ): Promise<void> {
    await this.commandBus.execute(
      new DeleteUserSessionByDeviceIdCommand({
        userId: refreshTokenPayload.userId,
        lastActiveDate: refreshTokenPayload.lastActiveDate,
        deviceId: deviceId,
      }),
    );
  }
}
