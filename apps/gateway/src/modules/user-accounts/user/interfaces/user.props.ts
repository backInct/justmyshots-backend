export interface IUserEntityProps {
  email: string;
  username: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
  deletedAt?: Date | null;
}
