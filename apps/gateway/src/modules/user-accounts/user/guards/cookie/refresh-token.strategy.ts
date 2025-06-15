import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserAccountsConfig } from '../../../user-accounts.config';
import { SecurityQueryRepository } from '../../../sessions/infrastructure/security.query-repository';
import { RefreshTokenPayloadDTO } from '../../application/dto/tokens.dto';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  constructor(
    private securityQueryRepository: SecurityQueryRepository,
    private readonly userAccountsConfig: UserAccountsConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
        (req) => req.cookies?.refreshToken,
      ]),
      ignoreExpiration: false,
      secretOrKey: userAccountsConfig.refreshTokenSecret,
    });
  }

  async validate(
    payload: RefreshTokenPayloadDTO,
  ): Promise<RefreshTokenPayloadDTO> {
    const sessionFound: boolean =
      await this.securityQueryRepository.isSessionByDeviceIdAndLastActiveDateFound(
        payload.deviceId,
        payload.lastActiveDate,
      );
    if (!sessionFound) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
