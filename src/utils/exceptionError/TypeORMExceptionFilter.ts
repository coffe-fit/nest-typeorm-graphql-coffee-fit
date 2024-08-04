import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch(QueryFailedError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();
    const response = context.res;

    const status = HttpStatus.BAD_REQUEST;
    const errorResponse = {
      statusCode: status,
      message: (exception as any).message,
      error: 'Bad Request',
    };

    response.status(status).json(errorResponse);
  }
}