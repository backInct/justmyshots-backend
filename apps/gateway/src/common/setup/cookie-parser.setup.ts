import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

export function cookieParserSetup(app: INestApplication): void {
  app.use(cookieParser());
}
