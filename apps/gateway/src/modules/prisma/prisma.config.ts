import { Injectable } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { configValidationUtility } from '../../core/config-validation.utility';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaConfig {
  @IsNotEmpty({
    message:
      'Set Env variable POSTGRES_URL, example: postgresql://username:password@localhost:5432/mydatabase',
  })
  postgresUrl: string;

  constructor(private configService: ConfigService<any, true>) {
    console.log(`${this.constructor.name} created`);

    this.postgresUrl = this.configService.get<string>('POSTGRES_URL');

    configValidationUtility.validateConfig(this);
  }
}
