import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configValidationUtility } from '../../core/config-validation.utility';
import { IsNotEmpty, IsNumber, NotEquals } from 'class-validator';

@Injectable()
export class EmailConfig {
  @IsNotEmpty({
    message: 'Set Env variable EMAIL_HOST, example: smtp.mail.ru',
  })
  emailHost: string;

  @NotEquals(0, {
    message: 'Env variable EMAIL_PORT must be > 0, example: 465',
  })
  @IsNumber(
    {},
    {
      message: 'Set Env variable EMAIL_PORT, example: 465',
    },
  )
  emailPort: number;

  @IsNotEmpty({
    message: 'Set Env variable EMAIL_USER, example: example@mail.ru',
  })
  emailUser: string;

  @IsNotEmpty({
    message: 'Set Env variable EMAIL_PASSWORD, example: passwordForMail',
  })
  emailPassword: string;

  constructor(private configService: ConfigService<any, true>) {
    console.log(`${this.constructor.name} created`);

    this.emailHost = this.configService.get<string>('EMAIL_HOST');

    this.emailPort = Number(this.configService.get<string>('EMAIL_PORT'));

    this.emailUser = this.configService.get<string>('EMAIL_USER');

    this.emailPassword = this.configService.get<string>('EMAIL_PASSWORD');

    configValidationUtility.validateConfig(this);
  }
}
