export interface EmailConfirmationCreateDTO {
  code: string;
  expiresAt: Date;
  verification?: boolean;
}
