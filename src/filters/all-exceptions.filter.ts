import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // ممكن exceptionResponse يكون string أو object
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const res: any = exceptionResponse;
        message = res.message || message;

        // 👇 حالة "No Content"
        if (res.data === null) {
          status = HttpStatus.NO_CONTENT;
          message = 'No data found';
        }
      }
    }

    response.status(status).json({
      // statusCode : 404,
      status: 'error',
      message,
      // path: request.url,
      // timestamp: new Date().toISOString(),
    });
  }
}
