import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { Code } from 'typeorm';

@Catch(HttpException)
export class GqlHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();
    const response = context.res;

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse() as
      | string
      | { error: string; message: string[]; statusCode: number };

    const errorResponse = {
      statusCode,
      message: exception.message,
      ...(typeof exceptionResponse === 'string' ? { error: exceptionResponse } : exceptionResponse),
    };

    console.error('GraphQL Error:', JSON.stringify(errorResponse));
    response.status(statusCode).json(errorResponse);
  }
}

@Catch(BadRequestException)
export class GqlBadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();
    const response = context.res;

    const exceptionResponse = exception.getResponse();
    let message = '';

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const { message: msg } = exceptionResponse as any;
      message = msg;
    }

    const errorResponse = {
      statusCode: 400,
      error: { 
        code: 'BAD_USER_INPUT', 
        message,
      },
    };

    console.warn('GqlBadRequestExceptionFilter:', JSON.stringify(errorResponse));
    response.status(400).json(errorResponse);
  }
}
