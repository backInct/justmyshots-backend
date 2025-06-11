import { UserCreateDTO } from '../dto/create.user.dto';
import { Prisma, User } from '../../../../../generated';

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

  public static createInstance(dto: UserCreateDTO): UserEntity {
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

  public markDeleted() {
    if (this.deletedAt) throw new Error('User already deleted');
    this.deletedAt = new Date();
  }

  public getId(): string | undefined {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getDeletedAt() {
    return this.deletedAt;
  }

  public installPassword(hash: string) {
    this.passwordHash = hash;
  }
}
