import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const errorFormatter = (errors: ValidationError[]) =>
  errors.flatMap((error) =>
    Object.entries(error.constraints ?? {}).map(([_, message]) => ({
      field: error.property,
      message,
    })),
  );

export function pipesSetup(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errorFormatter(errors);

        throw new BadRequestException(formattedErrors);
      },
    }),
  );
}
