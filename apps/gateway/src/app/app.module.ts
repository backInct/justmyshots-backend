import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { UsersAccountsModule } from '../modules/user-accounts/users.accounts.module';
import { PrismaService } from '../modules/prisma/service/prisma.service';
import { EmailModule } from '../modules/email/email.module';
import { EnvModule } from '../common/modules/env.module';
import { CoreModule } from '../common/modules/core.module';
import { throttlerConfig } from '../common/configs/throttler.config';

@Module({
  imports: [
    EnvModule,
    CoreModule,
    ClientsModule.register([
      {
        name: 'TCP_SERVICE_FILES',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9001,
        },
      },
    ]),
    ThrottlerModule.forRoot([throttlerConfig]),
    EmailModule,
    UsersAccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
