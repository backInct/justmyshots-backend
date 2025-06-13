import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './service/email.service';
import { CoreModule } from '../../common/modules/core.module';
import { AppConfig } from '../../common/configs/app.config';
import { TEMPLATES_DIR } from '../../common/constants/templates.dir';

const services = [EmailService];

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [CoreModule],
      inject: [AppConfig],
      useFactory: (coreConfig: AppConfig) => ({
        transport: {
          secure: true,
          auth: {
            user: coreConfig.emailUser,
            pass: coreConfig.emailPassword,
          },
          port: coreConfig.emailPort,
          host: coreConfig.emailHost,
        },
        defaults: {
          from: `"Backend" <${coreConfig.emailUser}>`,
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
