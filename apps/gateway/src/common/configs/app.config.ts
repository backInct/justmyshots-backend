import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import { AppConfigDTO } from '../dto/app.config.dto';

@Injectable()
export class AppConfig {
  public port: number;
  public env: string;
  public adminEmail: string;
  public adminEmailPassword: string;
  public globalPrefix: string;
  public isSwaggerEnabled: boolean;

  constructor(private configService: ConfigService) {
    const rawConfig = {
      port: this.configService.get('PORT'),
      env: this.configService.get('NODE_ENV'),
      adminEmail: this.configService.get('ADMIN_EMAIL'),
      adminEmailPassword: this.configService.get('ADMIN_EMAIL_PASSWORD'),
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
