import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../infrastructure/user.repository';
import { UserEntity } from '../../domain/user.entity';
import { UserContextDTO } from '../../../decorators/dto/user-context.dto';
import { UserId } from '../../domain/dto/user.dto';
import {
  AccessAndRefreshTokensDTO,
  AccessTokenPayloadDTO,
  RefreshTokenPayloadDTO,
} from '../dto/tokens.dto';
import {
  ACCESS_TOKEN_STRATEGY_INJECT_TOKEN,
  REFRESH_TOKEN_STRATEGY_INJECT_TOKEN,
} from '../../constants/auth-tokens.inject-constants';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UserRepository,
    private bcryptService: BcryptService,
    @Inject(ACCESS_TOKEN_STRATEGY_INJECT_TOKEN)
    private accessTokenContext: JwtService,
    @Inject(REFRESH_TOKEN_STRATEGY_INJECT_TOKEN)
    private refreshTokenContext: JwtService,
  ) {}

  async validateUser(
    loginOrEmail: string,
    password: string,
  ): Promise<UserContextDTO> {
    const user: UserEntity | null =
      await this.usersRepository.findUserByLoginOrEmail(loginOrEmail);

    if (!user) throw new UnauthorizedException();

    const isUserValid = await this.bcryptService.comparePassword(
      password,
      user.getPasswordHash(),
    );

    if (!isUserValid) throw new UnauthorizedException();

    return { userId: user.getId() };
  }

  createTokens(userId: UserId, deviceId: string): AccessAndRefreshTokensDTO {
    const accessTokenPayload: Omit<AccessTokenPayloadDTO, 'exp'> = {
      userId,
      lastActiveDate: new Date().toISOString(),
    };
    const refreshTokenPayload: Omit<RefreshTokenPayloadDTO, 'exp'> = {
      userId,
      deviceId,
      lastActiveDate: new Date().toISOString(),
    };

    const accessToken: string =
      this.accessTokenContext.sign(accessTokenPayload);
    const refreshToken: string =
      this.refreshTokenContext.sign(refreshTokenPayload);

    return { accessToken, refreshToken };
  }

  getRefreshTokenPayload(refreshToken: string): RefreshTokenPayloadDTO {
    return this.refreshTokenContext.decode(refreshToken);
  }
}
