import { Prisma, User } from '../../../../../prisma/generated';
import { UserCreateDomainDTO } from './dto/user.dto';

export const userLoginConstraints = {
  minLength: 6,
  maxLength: 30,
  match: /^[a-zA-Z0-9_-]*$/,
};

export const userEmailConstraints = {
  maxLength: 254,
  match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
};

export const userPasswordConstraints = {
  minLength: 6,
  maxLength: 20,
};

interface IUserEntityProps {
  email: string;
  username: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
  deletedAt?: Date | null;
}

export class UserEntity {
  public email: string;
  public username: string;
  public passwordHash: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  protected id?: string;
  private deletedAt?: Date | null = null;

  private constructor(data: IUserEntityProps) {
    Object.assign(this, data);
  }

  public static createInstance(dto: UserCreateDomainDTO): UserEntity {
    return new UserEntity({
      email: dto.email,
      username: dto.username,
      passwordHash: dto.password,
    });
  }

  public static fromPrisma(data: User): UserEntity {
    return new UserEntity({
      id: data.id,
      email: data.email,
      username: data.username,
      passwordHash: data.passwordHash,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt ?? null,
    });
  }

  public toPrisma(): Prisma.UserCreateInput {
    return {
      email: this.email,
      username: this.username,
      passwordHash: this.passwordHash,
    };
  }

  public markDeleted(): void {
    if (this.deletedAt) throw new Error('User already deleted');
    this.deletedAt = new Date();
  }

  public getId(): string {
    if (!this.id) {
      throw new Error('User id is not set');
    }
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getDeletedAt(): Date | null {
    return this.deletedAt ?? null;
  }

  public installPassword(hash: string): void {
    this.passwordHash = hash;
  }

  public getPasswordHash(): string {
    return this.passwordHash;
  }
}
