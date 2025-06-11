import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerModule } from '@nestjs/throttler';
import { throttlerConfig } from '../common/config/throttler.config';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { CoreModule } from '../common/core.module';
import { EnvModule } from '../envModule';
import { UsersAccountsModule } from '../modules/user-accounts/users.accounts.module';
import { PrismaService } from '../modules/prisma/prisma.service';
import { EmailModule } from '../modules/email/email.module';

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
