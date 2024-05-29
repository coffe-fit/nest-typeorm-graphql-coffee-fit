import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { Code } from 'typeorm';

@Catch(HttpException)
export class GqlHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();
    const response = context.res;
    console.log(gqlHost.getInfo().fieldName, new Date().toISOString(),);
    const exceptionResponse = exception.getResponse(); // Obtener la respuesta de la excepción

    let errorCode = 'UNKNOWN_ERROR'; // Valor por defecto para el código de error
    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      // Desestructuramos para obtener el código de error y el mensaje
      const { error, message } = exceptionResponse as any;
      if (error) {
        errorCode = error;
      }
    }
    const errorResponse = {
      error: { code: errorCode.replaceAll(' ','_').toUpperCase(), ...exception},
    };
    response.status(exception.getStatus()).json({...errorResponse});
  }
}