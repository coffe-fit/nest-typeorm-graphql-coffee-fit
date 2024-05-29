import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, Catch } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Catch(HttpException)
export class GraphQLExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('gqlContext.getInfo().fieldName, err?.response');
    const gqlContext = GqlExecutionContext.create(context);
    const response = gqlContext.getContext().res;

    return next.handle().pipe(
      tap({
        error: (err) => {
          console.log(gqlContext.getInfo().fieldName, err?.response);
          
          if (response && typeof response.status === 'function') {
            const status = err?.status || 500;
            response.status(status).json({
              error: {
                message: err?.response?.message,
                timestamp: new Date().toISOString(),
                extensions: {
                  code: "",
                  status: err?.response?.statusCode || 500,
                  error: err?.response?.error || 'Not Fount',
                },
              }
            });

          
          } else {
            console.error('Response object is invalid or response.status is not a function', response);
          }
        },
      }),
    );
  }
}