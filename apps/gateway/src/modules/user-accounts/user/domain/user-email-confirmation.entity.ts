import { UserEmailConfirmation } from '../../../../../prisma/generated';
import { EmailConfirmationCreateDomainDTO } from './dto/user-email-confirmation.dto';

interface IUserEmailConfirmationEntityProps {
  id?: string;
  verification?: boolean;
  createdAt?: Date;
  code: string;
  expiresAt: Date;
  userId: string;
}

export class UserEmailConfirmationEntity {
  public code: string;
  public expiresAt: Date;
  public verification: boolean = false;
  public createdAt: Date;
  public id: string;
  public userId: string;

  private constructor(data: IUserEmailConfirmationEntityProps) {
    this.code = data.code;
    this.expiresAt = data.expiresAt;
    this.userId = data.userId;
  }

  public static buildInstance(
    dto: EmailConfirmationCreateDomainDTO,
    userId: string,
  ): UserEmailConfirmationEntity {
    return new UserEmailConfirmationEntity({
      code: dto.code,
      expiresAt: dto.expiresAt,
      userId,
    });
  }

  public static fromPrisma(
    data: UserEmailConfirmation,
  ): UserEmailConfirmationEntity {
    return new UserEmailConfirmationEntity({
      id: data.id,
      code: data.code,
      expiresAt: data.expiresAt,
      verification: data.verification,
      userId: data.userId,
      createdAt: data.createdAt,
    });
  }

  public toPrisma() {
    return {
      code: this.code,
      expiresAt: this.expiresAt,
      userId: this.userId,
    };
  }

  public updateCodeAndVerification(code: string, verification: boolean): void {
    this.code = code;
    this.verification = verification;
  }

  public getUserId(): string {
    return this.userId;
  }
}
