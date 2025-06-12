import { ErrorExceptionFilter } from '../filters/error-exception.filter';
import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from '../filters/http-exception.filter';

export function exceptionFilterSetup(app: INestApplication) {
  app.useGlobalFilters(new ErrorExceptionFilter(), new HttpExceptionFilter());
}
