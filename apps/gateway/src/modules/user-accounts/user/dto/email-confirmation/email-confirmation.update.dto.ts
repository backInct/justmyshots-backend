export interface EmailConfirmationUpdateDTO {
  code: string;
  expiresAt: Date;
  verification: boolean;
}
