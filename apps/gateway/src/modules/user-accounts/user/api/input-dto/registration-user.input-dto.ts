import { IsEmail, Length, Matches, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Trim } from 'apps/gateway/src/common/decorators/trim.decorator';
import { IsValidUsername } from '../../../../../common/decorators/valid.username.decorator';

export class RegistrationUserInputDTO {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
    maxLength: 254,
  })
  @Trim()
  @IsEmail()
  @MaxLength(254, {
    message: 'Данный email слишком длинный!',
  })
  email: string;

  @ApiProperty({
    example: 'username123',
    description: 'Уникальное имя пользователя',
    minLength: 6,
    maxLength: 30,
  })
  @Trim()
  @Length(6, 30)
  @IsValidUsername({ message: 'Неверный формат username' })
  username: string;

  @ApiProperty({
    example: 'Elena228!',
    description:
      'Пароль должен содержать цифру, заглавную и строчную буквы, спецсимвол',
    minLength: 6,
    maxLength: 20,
  })
  @Trim()
  @Length(6, 20)
  @Matches(
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{6,20}$/,
    {
      message:
        'Пароль должен содержать цифру, заглавную и строчную буквы, спецсимвол',
    },
  )
  password: string;
}
