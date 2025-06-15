import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './service/email.service';
import { TEMPLATES_DIR } from '../../common/constants/templates.dir';
import { EmailConfig } from './email.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [EmailModule],
      inject: [EmailConfig],
      useFactory: (emailConfig: EmailConfig) => ({
        transport: {
          secure: true,
          auth: {
            user: emailConfig.emailUser,
            pass: emailConfig.emailPassword,
          },
          port: emailConfig.emailPort,
          host: emailConfig.emailHost,
        },
        defaults: {
          from: `"Backend" <${emailConfig.emailUser}>`,
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
  providers: [EmailService, EmailConfig],
  exports: [EmailService, EmailConfig],
})
export class EmailModule {}
