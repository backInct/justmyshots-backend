import { NestFactory } from '@nestjs/core';
import { FilesModule } from './files.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FilesModule,
    {
      transport: Transport.TCP,
      options: {
        port: 9001,
        host: '127.0.0.1',
      },
    },
  );
  await app.listen();
}

bootstrap();
