import { randomUUID } from 'node:crypto';
import { add } from 'date-fns';
import { EmailConfirmationCreateDTO } from '../dto/email-confirmation.create.dto';

export function installGenerateEmailConfirmData(): EmailConfirmationCreateDTO {
  const code: string = randomUUID();
  return {
    code,
    expiresAt: add(new Date(), { hours: 1, minutes: 30, seconds: 10 }),
    verification: false,
  };
}
