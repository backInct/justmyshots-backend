import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppConfig } from './common/configs/app.config';
import { fullConfigApp } from './common/setup/full.config.setup';

async function bootstrap(): Promise<void> {
  const appContext = await NestFactory.create(AppModule);

  const coreConfig: AppConfig = appContext.get<AppConfig>(AppConfig);

  const app = await NestFactory.create(AppModule);

  fullConfigApp(app, coreConfig);

  await app.listen(coreConfig.port, () => {
    console.log('Сервер запущен на порту: ' + coreConfig.port);
    console.log('ENV:', coreConfig.env);
  });
}

bootstrap();
