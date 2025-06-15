import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AuthService } from '../../application/service/auth.service';
import { UserContextDTO } from '../../../decorators/dto/user-context.dto';
import { LoginUserInputDto } from '../../api/input-dto/login-user.input-dto';
import { errorFormatter } from '../../../../../common/setup/pipes.setup';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'loginOrEmail',
      passwordField: 'password',
    });
  }

  async validate(
    loginOrEmail: string,
    password: string,
  ): Promise<UserContextDTO> {
    const loginInputDto = plainToInstance(LoginUserInputDto, {
      loginOrEmail,
      password,
    });

    const errors = await validate(loginInputDto);

    if (errors.length > 0) {
      const formattedErrors = errorFormatter(errors);

      throw new BadRequestException(formattedErrors);
    }

    const user: UserContextDTO = await this.authService.validateUser(
      loginInputDto.loginOrEmail,
      loginInputDto.password,
    );

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
