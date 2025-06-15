import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDTO } from './dto/email-send.dto';
import { TemplateName } from '../enum/template.enum';
import { EmailConfig } from '../email.config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly emailConfig: EmailConfig,
  ) {}

  registration(email: string, confirmationCode: string): void {
    console.log({ emailConfig: this.emailConfig });
    const dto: SendEmailDTO = {
      email,
      subject: 'Подтверждение регистрации',
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
        from: `JustMyShots ${this.emailConfig.emailUser}`,
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
