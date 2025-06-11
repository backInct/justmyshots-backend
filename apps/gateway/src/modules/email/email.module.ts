import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { CoreModule } from '../../common/core.module';
import { AppConfig } from '../../common/config/app.config';
import { EmailService } from './service/email.service';
import { TEMPLATES_DIR } from '../../common/constants/templates.dir';

const services = [EmailService];

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [CoreModule],
      inject: [AppConfig],
      useFactory: (coreConfig: AppConfig) => ({
        transport: {
          service: 'yandex',
          secure: true,
          auth: {
            user: coreConfig.adminEmail,
            pass: coreConfig.adminEmailPassword,
          },
        },
        defaults: {
          from: `"Backend" <${coreConfig.adminEmail}>`,
        },
        template: {
          dir: TEMPLATES_DIR,
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [...services],
  exports: [...services],
})
export class EmailModule {}
