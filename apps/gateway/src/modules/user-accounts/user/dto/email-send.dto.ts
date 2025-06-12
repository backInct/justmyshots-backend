export interface SendEmailDTO {
  email: string;
  subject: string;
  templateName: string;
  context: object;
}
