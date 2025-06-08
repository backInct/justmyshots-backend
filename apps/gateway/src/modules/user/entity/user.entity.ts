import { UserCreateDTO } from '../dto/create.user.dto';

export class UserEntity {
  email: string;
  username: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  private id: string;
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

  protected installPassword(password: string) {
    this.passwordHash = password;
  }

  protected getId() {
    return this.id;
  }
}
