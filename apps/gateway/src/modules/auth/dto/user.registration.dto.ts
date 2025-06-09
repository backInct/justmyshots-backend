import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { IsTrimmed } from '../../../../common/validation/decorators/transform/trim';

export class UserRegistrationDTO {
  @IsTrimmed({ message: 'Объект пуст' })
  @IsEmail()
  @MaxLength(254, {
    message: 'Данный email слишком длинный!',
  })
  email: string;

  username: string;
  @MinLength(6, {
    message: 'Данный username слишком короткий!',
  })
  @MaxLength(20, {
    message: 'Данный username слишком длинный!',
  })
  password: string;
}
