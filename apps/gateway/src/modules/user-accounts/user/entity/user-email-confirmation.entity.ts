import { IUserEmailConfirmationEntityProps } from '../interfaces/email-confirmation.props';
import { UserEmailConfirmation } from '../../../../../generated';
import { EmailConfirmationCreateDTO } from '../dto/email-confirmation/email-confirmation.create.dto';
import { EmailConfirmationUpdateDTO } from '../dto/email-confirmation/email-confirmation.update.dto';

export class UserEmailConfirmationEntity {
  public code: string;
  public expiresAt: Date;
  public verification: boolean;
  public createdAt?: Date;
  private id?: string;
  private userId: string;

  private constructor(data: IUserEmailConfirmationEntityProps) {
    Object.assign(this, data);
  }

  public static buildInstance(
    dto: EmailConfirmationCreateDTO,
    userId: string,
  ): UserEmailConfirmationEntity {
    return new UserEmailConfirmationEntity({
      code: dto.code,
      expiresAt: dto.expiresAt,
      verification: dto.verification ?? false,
      userId,
    });
  }

  // Создать из данных Prisma
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

  // Преобразовать в plain объект для prisma.userEmailConfirmation.create/update
  public toPrisma() {
    return {
      id: this.id,
      code: this.code,
      expiresAt: this.expiresAt,
      verification: this.verification,
      userId: this.userId,
    };
  }

  // Методы для обновления кода и статуса подтверждения

  public updateCodeAndVerification(code: string, verification: boolean): void {
    this.code = code;
    this.verification = verification;
  }

  public updateFromDto(dto: EmailConfirmationUpdateDTO): void {
    this.code = dto.code;
    this.expiresAt = dto.expiresAt;
    this.verification = dto.verification;
  }

  // Геттер userId
  public getUserId(): string {
    return this.userId;
  }
}
