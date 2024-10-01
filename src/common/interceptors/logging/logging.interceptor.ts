import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MyLogger } from '../../../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: MyLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    return next.handle().pipe(
      tap({
        next: (data) => {
          const responseTime = Date.now() - now;
          this.logger.log(`${method} ${url} responded with status ${data.statusCode} in ${responseTime}ms`);
        },
        error: (error) => {
          const responseTime = Date.now() - now;
          this.logger.error(`${method} ${url} failed with error: ${error.message} in ${responseTime}ms`, error.stack);
        },
      }),
    );
  }
}
