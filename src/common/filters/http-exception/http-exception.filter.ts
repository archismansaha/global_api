import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { MyLogger } from '../../../logger/logger.service';

@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: MyLogger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exceptionResponse.message || exception.message,
    };

  
    this.logger.error(`HTTP Error: ${JSON.stringify(errorResponse)}`, exception.stack);

    response.status(status).json(errorResponse);
  }
}
