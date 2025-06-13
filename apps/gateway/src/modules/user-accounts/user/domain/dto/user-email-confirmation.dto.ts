export class EmailConfirmationCreateDomainDTO {
  public code: string;
  public expiresAt: Date;
}

export class EmailConfirmationUpdateDomainDTO {
  public code: string;
  public expiresAt: Date;
}
