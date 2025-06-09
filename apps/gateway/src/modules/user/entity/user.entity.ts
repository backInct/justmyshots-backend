import { UserCreateDTO } from '../dto/create.user.dto';

export class UserEntity {
  public email: string;
  public username: string;
  public passwordHash: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  private id?: string; // id может быть приватным
  private deletedAt?: Date | null;

  private constructor(data: Partial<UserEntity> = {}) {
    Object.assign(this, data);
  }

  public static createInstance(dto: UserCreateDTO): UserEntity {
    return new UserEntity({
      email: dto.email,
      username: dto.username,
      passwordHash: dto.passwordHash,
    });
  }

  protected deletedSoftUser() {
    this.deletedAt = new Date();
  }

  // Создать Entity из данных Prisma
  public static fromPrisma(data: any): UserEntity {
    return new UserEntity(data);
  }

  protected getId() {
    return this.id;
  }

  // Преобразование Entity в формат для Prisma (plain object)
  public toPrisma(): any {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      passwordHash: this.passwordHash,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  protected installPassword(hash: string) {
    this.passwordHash = hash;
  }
}
