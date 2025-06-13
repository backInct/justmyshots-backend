import { INestApplication } from '@nestjs/common';

export function corsSetup(app: INestApplication): void {
  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization, Custom-Header',
  });
}
