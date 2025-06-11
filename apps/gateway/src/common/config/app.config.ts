import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import { AppConfigDto } from './enviroment.config';

@Injectable()
export class AppConfig {
  public port: number;
  public env: string;
  public refreshTokenSecret: string;
  public accessTokenSecret: string;
  public accessTokenExpirationTime: string;
  public refreshTokenExpirationTime: string;
  public ip?: string;
  public userAgent?: string;
  public adminUsername: string;
  public adminPassword: string;
  public adminEmail: string;
  public adminEmailPassword: string;
  public globalPrefix: string;

  public typeSql: string;
  public hostSql: string;
  public portSql: number;
  public usernameSql: string;
  public passwordSql: string;
  public databaseNameSql: string;
  public isSwaggerEnabled: boolean;

  constructor(private configService: ConfigService) {
    const rawConfig = {
      port: this.configService.get('PORT'),
      env: this.configService.get('NODE_ENV'),
      refreshTokenSecret: this.configService.get('JWT_REFRESH_SECRET'),
      accessTokenSecret: this.configService.get('JWT_ACCESS_SECRET'),
      accessTokenExpirationTime: this.configService.get(
        'JWT_ACCESS_EXPIRATION_TIME',
      ),
      refreshTokenExpirationTime: this.configService.get(
        'JWT_REFRESH_EXPIRATION_TIME',
      ),
      adminUsername: this.configService.get('ADMIN_USERNAME'),
      adminPassword: this.configService.get('ADMIN_PASS'),
      adminEmail: this.configService.get('ADMIN_EMAIL'),
      adminEmailPassword: this.configService.get('ADMIN_EMAIL_PASSWORD'),
      ip: this.configService.get('IP_TEST'),
      userAgent: this.configService.get('USER_AGENT'),
      typeSql: this.configService.get('TYPE_SQL'),
      hostSql: this.configService.get('POSTGRES_HOST'),
      portSql: this.configService.get('POSTGRES_PORT'),
      usernameSql: this.configService.get('POSTGRES_USER'),
      passwordSql: this.configService.get('POSTGRES_PASSWORD'),
      databaseNameSql: this.configService.get('POSTGRES_DB'),
      isSwaggerEnabled: this.configService.get('IS_SWAGGER_ENABLED'),
      globalPrefix: this.configService.get('GLOBAL_PREFIX'),
    };

    const config = plainToInstance(AppConfigDto, rawConfig, {
      enableImplicitConversion: true,
    });

    const errors: ValidationError[] = validateSync(config, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (errors.length > 0) {
      throw new Error('Ошибка валидации конфига: ' + JSON.stringify(errors));
    }

    Object.assign(this, config);
  }
}
