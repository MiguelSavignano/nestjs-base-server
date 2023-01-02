import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  DynamicModule,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}

export class ExternalModule {
  static forRoot(): DynamicModule {
    return {
      providers: [
        LoggingInterceptor,
        {
          provide: APP_INTERCEPTOR,
          useClass: LoggingInterceptor,
        },
      ],
      module: ExternalModule,
    };
  }
}
