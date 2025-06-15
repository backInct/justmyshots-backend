import { INestApplication } from '@nestjs/common';
import { pipesSetup } from './pipes.setup';
import { exceptionFilterSetup } from './exception-filter.setup';
import { addVersionSetup } from './version.setup';
import { cookieParserSetup } from './cookie-parser.setup';
import { corsSetup } from './cors.setup';
import { swaggerSetup } from './swagger.setup';
import { CoreConfig } from '../../core/core.config';

export function fullConfigApp(
  app: INestApplication,
  coreConfig: CoreConfig,
): void {
  corsSetup(app);
  cookieParserSetup(app);
  pipesSetup(app);
  exceptionFilterSetup(app);
  app.setGlobalPrefix(coreConfig.apiGlobalPrefix);
  addVersionSetup(app);
  if (coreConfig.isSwaggerEnabled) {
    swaggerSetup(app);
  }
}
