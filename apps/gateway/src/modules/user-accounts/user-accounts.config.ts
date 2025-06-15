import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configValidationUtility } from '../../core/config-validation.utility';
import { IsNotEmpty } from 'class-validator';

@Injectable()
export class UserAccountsConfig {
  @IsNotEmpty({
    message:
      'Set Env variable ACCESS_TOKEN_SECRET, example: SomeVeryHardSecret!#$',
  })
  accessTokenSecret: string;

  @IsNotEmpty({
    message:
      'Set Env variable ACCESS_TOKEN_LIFETIME, example: 30000 (ms), 30s, 10m, 1h, 1d',
  })
  accessTokenLifetime: string;

  @IsNotEmpty({
    message:
      'Set Env variable REFRESH_TOKEN_SECRET, example: SomeVeryHardSecret!#$',
  })
  refreshTokenSecret: string;

  @IsNotEmpty({
    message:
      'Set Env variable REFRESH_TOKEN_LIFETIME, example: 30000 (ms), 30s, 10m, 1h, 1d',
  })
  refreshTokenLifetime: string;

  constructor(private configService: ConfigService<any, true>) {
    console.log(`${this.constructor.name} created`);

    this.accessTokenSecret = this.configService.get<string>(
      'ACCESS_TOKEN_SECRET',
    );

    this.accessTokenLifetime = this.configService.get<string>(
      'ACCESS_TOKEN_LIFETIME',
    );

    this.refreshTokenSecret = this.configService.get<string>(
      'REFRESH_TOKEN_SECRET',
    );

    this.refreshTokenLifetime = this.configService.get<string>(
      'REFRESH_TOKEN_LIFETIME',
    );

    configValidationUtility.validateConfig(this);
  }
}
