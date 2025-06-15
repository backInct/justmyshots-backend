import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { configValidationUtility } from './config-validation.utility';
import { Injectable } from '@nestjs/common';

export enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TESTING = 'testing',
}

@Injectable()
export class CoreConfig {
  @IsNumber(
    {},
    {
      message: 'Set Env variable PORT, example: 5000',
    },
  )
  port: number;

  @IsEnum(Environment, {
    message:
      'Set correct NODE_ENV value, available values: ' +
      configValidationUtility.getEnumValue(Environment).join(', '),
  })
  env: string;

  @IsBoolean({
    message:
      'Set Env variable IS_SWAGGER_ENABLED to enable/disable Swagger, example: true, available values: true, false, 1, 0',
  })
  isSwaggerEnabled: boolean;

  @IsNumber(
    {},
    {
      message: 'Set Env variable LIMIT_REQUEST_IN_TTL, example: 5',
    },
  )
  limitRequestInTtl: number;

  @IsNumber(
    {},
    {
      message: 'Set Env variable TTL_IN_SECONDS, example: 10',
    },
  )
  ttlInSeconds: number;

  @IsNotEmpty({
    message: `Set Env variable API_GLOBAL_PREFIX, example: 'api/v1'`,
  })
  apiGlobalPrefix: string;

  constructor(private configService: ConfigService<any, true>) {
    console.log(`${this.constructor.name} created`);

    this.port = parseInt(this.configService.get('PORT'));

    this.env = this.configService.get('NODE_ENV');
    console.log({ port: this.port, env: this.env });
    this.isSwaggerEnabled = configValidationUtility.convertToBoolean(
      this.configService.get('IS_SWAGGER_ENABLED'),
    ) as boolean;

    this.limitRequestInTtl = parseInt(
      this.configService.get<string>('LIMIT_REQUEST_IN_TTL'),
    );

    this.ttlInSeconds = parseInt(
      this.configService.get<string>('TTL_IN_SECONDS'),
    );

    this.apiGlobalPrefix = this.configService.get<string>('API_GLOBAL_PREFIX');

    configValidationUtility.validateConfig(this);
  }
}
