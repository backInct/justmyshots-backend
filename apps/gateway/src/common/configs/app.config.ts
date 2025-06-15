import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import { AppConfigDTO } from '../dto/app.config.dto';

/**
 * @deprecated
 */
@Injectable()
export class AppConfig {
  public port: number;
  public env: string;
  public emailUser: string;
  public emailPassword: string;
  public emailHost: string;
  public emailPort: number;
  public globalPrefix: string;
  public isSwaggerEnabled: boolean;
  public postgresURI: string;

  constructor(private configService: ConfigService) {
    const rawConfig = {
      port: this.configService.get('PORT'),
      env: this.configService.get('NODE_ENV'),
      emailUser: this.configService.get('EMAIL_USER'),
      emailPassword: this.configService.get('EMAIL_PASSWORD'),
      emailHost: this.configService.get('EMAIL_HOST'),
      emailPort: this.configService.get('EMAIL_PORT'),
      postgresURI: this.configService.get('POSTGRES_URI'),
      isSwaggerEnabled: this.configService.get('IS_SWAGGER_ENABLED'),
      globalPrefix: this.configService.get('GLOBAL_PREFIX'),
    };

    const config: AppConfigDTO = plainToInstance(AppConfigDTO, rawConfig, {
      enableImplicitConversion: true,
    });

    const errors: ValidationError[] = validateSync(config, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      throw new Error('Ошибка валидации конфига: ' + String(errors));
    }

    Object.assign(this, config);
  }
}
