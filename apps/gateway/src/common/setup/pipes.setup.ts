import { INestApplication, ValidationPipe } from '@nestjs/common';

export function pipesSetup(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
    }),
  );
}
