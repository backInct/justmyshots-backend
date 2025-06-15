import {
  ACCESS_TOKEN_STRATEGY_INJECT_TOKEN,
  REFRESH_TOKEN_STRATEGY_INJECT_TOKEN,
} from './constants/auth-tokens.inject-constants';
import { Provider } from '@nestjs/common';
import { UserAccountsConfig } from '../user-accounts.config';
import { JwtService } from '@nestjs/jwt';

export const jwtProviders: Provider[] = [
  {
    inject: [UserAccountsConfig],
    provide: ACCESS_TOKEN_STRATEGY_INJECT_TOKEN,
    useFactory: (userAccountsConfig: UserAccountsConfig): JwtService => {
      return new JwtService({
        secret: userAccountsConfig.accessTokenSecret,
        signOptions: {
          expiresIn: userAccountsConfig.accessTokenLifetime,
          noTimestamp: true,
        },
      });
    },
  },
  {
    inject: [UserAccountsConfig],
    provide: REFRESH_TOKEN_STRATEGY_INJECT_TOKEN,
    useFactory: (userAccountsConfig: UserAccountsConfig): JwtService => {
      return new JwtService({
        secret: userAccountsConfig.refreshTokenSecret,
        signOptions: {
          expiresIn: userAccountsConfig.refreshTokenLifetime,
          noTimestamp: true,
        },
      });
    },
  },
];
