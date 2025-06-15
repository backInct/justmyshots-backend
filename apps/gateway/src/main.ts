import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { fullConfigApp } from './common/setup/full.config.setup';
import { CoreConfig } from './core/core.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const coreConfig = app.get<CoreConfig>(CoreConfig);

  fullConfigApp(app, coreConfig);

  await app.listen(coreConfig.port, () => {
    console.log('Сервер запущен на порту: ' + coreConfig.port);
    console.log('NODE_ENV:', coreConfig.env);
  });
}

bootstrap();
