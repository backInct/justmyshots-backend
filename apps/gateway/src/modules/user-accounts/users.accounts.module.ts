import { Module } from '@nestjs/common';
import { AuthController } from './user/api/auth.controller';
import { UserController } from './user/api/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserQueryRepository } from './user/infrastructure/query/user.query.repository';
import { UserRepository } from './user/infrastructure/user.repository';
import { BcryptService } from './user/application/service/bcrypt.service';
import { UserEmailConfirmationRepository } from './user/infrastructure/email-confirmation.repository';
import { RegistrationUserUseCase } from './user/application/use-cases/registration-user.usecase';
import { CommonCreateUserUseCase } from './user/application/use-cases/create-user.usecase';
import { UniqueUserUseCase } from './user/application/use-cases/unique-user.usecase';
import { EmailModule } from '../email/email.module';
import { RegistrationConfirmationUserUseCase } from './user/application/use-cases/registration-confirmation-user.usecase';
import { jwtProviders } from './providers/jwt.providers';
import { CreateSessionUseCase } from './sessions/application/use-cases/create-session.use-case';
import { DeleteAllUserSessionsExpectCurrentUseCase } from './sessions/application/use-cases/delete-all-user-sessions-expect-current.use-case';
import { DeleteUserSessionByDeviceIdUseCase } from './sessions/application/use-cases/delete-user-session-by-device-id.use-case';
import { UpdateUserSessionUseCase } from './sessions/application/use-cases/update-user-session.use-case';
import { SecurityRepository } from './sessions/infrastructure/security.repository';
import { SecurityQueryRepository } from './sessions/infrastructure/security.query-repository';
import { AuthService } from './user/application/service/auth.service';
import { UserAccountsConfig } from './user-accounts.config';
import { PrismaModule } from '../prisma/prisma.module';
import { LocalStrategy } from './user/guards/local/local.strategy';
import { AccessTokenStrategy } from './user/guards/bearer/access-token.strategy';
import { RefreshTokenStrategy } from './user/guards/cookie/refresh-token.strategy';
import { LoginUserUseCase } from './user/application/use-cases/login-user.use-case';
import { SessionController } from './sessions/api/session.controller';

const repositories = [
  UserEmailConfirmationRepository,
  UserQueryRepository,
  UserRepository,
  SecurityRepository,
  SecurityQueryRepository,
];
const cases = [
  RegistrationUserUseCase,
  CommonCreateUserUseCase,
  UniqueUserUseCase,
  RegistrationConfirmationUserUseCase,
  LoginUserUseCase,
  CreateSessionUseCase,
  DeleteAllUserSessionsExpectCurrentUseCase,
  DeleteUserSessionByDeviceIdUseCase,
  UpdateUserSessionUseCase,
];
const services = [BcryptService, AuthService, UserAccountsConfig];
const strategies = [LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy];

@Module({
  imports: [CqrsModule, EmailModule, PrismaModule],
  controllers: [AuthController, UserController, SessionController],
  providers: [
    ...repositories,
    ...services,
    ...cases,
    ...strategies,
    ...jwtProviders,
  ],
})
export class UsersAccountsModule {}
