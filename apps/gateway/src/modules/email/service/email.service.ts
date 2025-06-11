import { AppConfig } from '../../../common/config/app.config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { TemplateName } from '../enum/template.enum';
import { SendEmailDTO } from '../interfaces/email-send.interfaces';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly coreConfig: AppConfig,
  ) {}

  registration(email: string, confirmationCode: string): void {
    const dto: SendEmailDTO = {
      email,
      subject: 'Еще чуть - чуть и ты будешь у нас !',
      templateName: TemplateName.Registration,
      context: {
        confirmationCode,
      },
    };
    this.sendEmail(dto);
  }

  private sendEmail(dto: SendEmailDTO): void {
    this.mailerService
      .sendMail({
        from: `JustMyShots ${this.coreConfig.adminEmail}`,
        to: dto.email,
        subject: dto.subject,
        template: dto.templateName,
        context: dto.context,
      })
      .then((success) => {
        console.log(success.messageId);
      })
      .catch((err: unknown) => {
        console.log('ошибка при отправке сообщения: ' + String(err));
      });
  }
}
