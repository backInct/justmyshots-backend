import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';
import { ClientsModule, Transport } from '@nestjs/microservices';

// Клиент, который отправляет запросы!
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.cwd() + '/.env',
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'TCP_SERVICE_FILES',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 9001, // Порт Files!
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
