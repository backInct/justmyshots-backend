import { configModule } from './core/dynamic-config-module';
import { CoreModule } from './core/core.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app/api/app.controller';
import { AppService } from './app/service/app.service';
import { UsersAccountsModule } from './modules/user-accounts/users.accounts.module';
import { EmailModule } from './modules/email/email.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CoreConfig } from './core/core.config';

@Module({
  imports: [
    configModule,
    CoreModule,
    PrismaModule,
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
    ThrottlerModule.forRootAsync({
      imports: [CoreModule],
      inject: [CoreConfig],
      useFactory: (coreConfig: CoreConfig) => ({
        throttlers: [
          {
            ttl: seconds(coreConfig.ttlInSeconds),
            limit: coreConfig.limitRequestInTtl,
          },
        ],
      }),
    }),
    EmailModule,
    UsersAccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
