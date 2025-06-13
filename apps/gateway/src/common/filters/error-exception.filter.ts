import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: any = ctx.getResponse<Response>();

    if (process.env.enviromens !== 'production') {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        error: exception.toString(),
        stack: exception.stack,
      });
    } else {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('something went wrong');
    }
  }
}
