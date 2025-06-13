import { INestApplication, VersioningType } from '@nestjs/common';

/*
  Версионирование — это способ поддерживать несколько версий
  вашего API одновременно, чтобы клиенты могли постепенно
  переходить на новые версии без поломки существующих интеграций
 */
export function addVersionSetup(app: INestApplication): void {
  app.enableVersioning({
    type: VersioningType.URI,
  });
}
