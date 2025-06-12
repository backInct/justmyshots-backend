import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDTO } from '../../user-accounts/user/dto/email-send.dto';
import { TemplateName } from '../../user-accounts/user/enum/template.enum';
import { AppConfig } from '../../../common/configs/app.config';

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
      .then((success: unknown) => {
        console.log(success);
      })
      .catch((err: unknown) => {
        console.log('ошибка при отправке сообщения: ' + String(err));
      });
  }
}
