import { AppConfig } from './app.config';
import { INestApplication } from '@nestjs/common';
import { pipesSetup } from './pipes.config';
import { exceptionFilterSetup } from './exception-filter.config';
import { addVersionSetup } from './version.config';
import { cookieParserSetup } from './cookie-parser.config';
import { corsSetup } from './cors.config';
import { swaggerSetup } from './swagger.config';

export function fullConfigApp(
  app: INestApplication,
  coreConfig: AppConfig,
): void {
  corsSetup(app);
  cookieParserSetup(app);
  pipesSetup(app);
  exceptionFilterSetup(app);
  app.setGlobalPrefix(coreConfig.globalPrefix);
  addVersionSetup(app);
  if (coreConfig.isSwaggerEnabled) {
    swaggerSetup(app);
  }
}
