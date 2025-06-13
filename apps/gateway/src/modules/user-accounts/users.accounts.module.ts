import { Module } from '@nestjs/common';
import { AuthController } from './auth/api/auth.controller';
import { UserController } from './user/api/user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserQueryRepository } from './user/infrastructure/query/user.query.repository';
import { UserRepository } from './user/infrastructure/user.repository';
import { PrismaService } from '../prisma/service/prisma.service';
import { BcryptService } from './auth/application/service/bcrypt.service';
import { UserEmailConfirmationRepository } from './user/infrastructure/email-confirmation.repository';
import { RegistrationUserUseCase } from './auth/application/use-cases/registration-user.usecase';
import { CommonCreateUserUseCase } from './auth/application/use-cases/create-user.usecase';
import { UniqueUserUseCase } from './auth/application/use-cases/unique-user.usecase';
import { EmailModule } from '../email/email.module';

const repositories = [
  UserEmailConfirmationRepository,
  UserQueryRepository,
  UserRepository,
];
const cases = [
  RegistrationUserUseCase,
  CommonCreateUserUseCase,
  UniqueUserUseCase,
];
const services = [PrismaService, BcryptService];

@Module({
  imports: [CqrsModule, EmailModule],
  controllers: [AuthController, UserController],
  providers: [...repositories, ...services, ...cases],
})
export class UsersAccountsModule {}
