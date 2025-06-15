import { IsString, Length } from 'class-validator';
import { LoginOrEmailValidator } from '../../../decorators/validators/login-or-email.validator';
import { Trim } from '../../../../../common/decorators/trim.decorator';
import {
  userEmailConstraints,
  userLoginConstraints,
  userPasswordConstraints,
} from '../../domain/constants/user.constants';

export class LoginUserInputDto {
  @LoginOrEmailValidator({
    loginMinLength: userLoginConstraints.minLength,
    loginMaxLength: userLoginConstraints.maxLength,
    loginMatch: userLoginConstraints.match,
    emailMaxLength: userEmailConstraints.maxLength,
    emailMatch: userEmailConstraints.match,
  })
  @Trim()
  @IsString()
  loginOrEmail: string;

  @IsString()
  @Trim()
  @Length(userPasswordConstraints.minLength, userPasswordConstraints.maxLength)
  password: string;
}
