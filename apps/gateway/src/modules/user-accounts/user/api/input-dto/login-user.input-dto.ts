import { IsString } from 'class-validator';
import { LoginOrEmailValidator } from '../../../decorators/validators/login-or-email.validator';
import { IsStringWithTrimWithLength } from '../../../../../common/validation/decorators/validators/is-string-with-trim-with-length';
import {
  userEmailConstraints,
  userLoginConstraints,
  userPasswordConstraints,
} from '../../domain/user.entity';
import { TrimDecorator } from '../../../../../common/decorators/trim.decorator';

export class LoginUserInputDto {
  @LoginOrEmailValidator({
    loginMinLength: userLoginConstraints.minLength,
    loginMaxLength: userLoginConstraints.maxLength,
    loginMatch: userLoginConstraints.match,
    emailMaxLength: userEmailConstraints.maxLength,
    emailMatch: userEmailConstraints.match,
  })
  @TrimDecorator()
  @IsString()
  loginOrEmail: string;

  @IsStringWithTrimWithLength(
    userPasswordConstraints.minLength,
    userPasswordConstraints.maxLength,
  )
  password: string;
}
