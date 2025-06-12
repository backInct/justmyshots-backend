export interface IUserEmailConfirmationEntityProps {
  id?: string;
  code: string;
  expiresAt: Date;
  verification: boolean;
  userId: string;
  createdAt?: Date;
}
