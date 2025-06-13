import { EmailConfirmationCreateDomainDTO } from './dto/user-email-confirmation.dto';

interface IUserEmailConfirmationEntityCreateProps {
  code: string;
  expiresAt: Date;
  userId: string;
}

interface IUserEmailConfirmationEntityDBProps
  extends IUserEmailConfirmationEntityCreateProps {
  id: string;
  createdAt: Date;
  verification: boolean;
}

export class UserEmailConfirmationEntity {
  public readonly id?: string;
  public readonly createdAt?: Date;
  public code: string;
  public expiresAt: Date;
  public verification: boolean;
  public userId: string;

  private constructor(props: IUserEmailConfirmationEntityCreateProps) {
    this.code = props.code;
    this.expiresAt = props.expiresAt;
    this.userId = props.userId;
    this.verification = false;
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
    data: IUserEmailConfirmationEntityDBProps,
  ): UserEmailConfirmationEntity {
    const entity = new UserEmailConfirmationEntity({
      code: data.code,
      expiresAt: data.expiresAt,
      userId: data.userId,
    });
    Object.defineProperty(entity, 'id', { value: data.id, writable: false });
    Object.defineProperty(entity, 'createdAt', {
      value: data.createdAt,
      writable: false,
    });
    entity.verification = data.verification;
    return entity;
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

  public getId(): string {
    if (!this.id) {
      throw new Error('ID is not set');
    }
    return this.id;
  }

  public canConfirmEmail(): boolean {
    return !this.verification && this.expiresAt > new Date();
  }

  public confirmEmail(confirmationCode: string): void {
    if (this.code !== confirmationCode) {
      throw new Error('invalid confirmation code');
    }
    if (!this.canConfirmEmail()) {
      throw new Error('Email was already confirmed or expired date');
    }
    this.verification = true;
    this.expiresAt = new Date();
  }
}
