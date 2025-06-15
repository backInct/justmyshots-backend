import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    const status: number = exception.getStatus();

    if (status === HttpStatus.BAD_REQUEST) {
      const errorsBody: { errors: { field: string; message: string }[] } = {
        errors: [],
      };

      const responseBody: any = exception.getResponse();

      const messages = responseBody['message'];
      if (Array.isArray(messages)) {
        messages.forEach((mess) => errorsBody.errors.push(mess));
      } else {
        errorsBody.errors.push({
          field: '',
          message: '',
        });
      }

      response.status(status).send(errorsBody);
    } else {
      response.sendStatus(status);
    }
  }
}
