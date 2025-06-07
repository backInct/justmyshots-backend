import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { swaggerSetup } from '../common/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.getOrThrow<number>('PORT');

  app.use(cookieParser());

  app.setGlobalPrefix('api/v1');

  swaggerSetup(app);

  await app.listen(port, () => {
    console.log('App starting listen port: ', port);
  });
}

bootstrap();
