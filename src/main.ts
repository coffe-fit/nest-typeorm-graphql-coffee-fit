import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TypeORMExceptionFilter } from './typeorm-exceptions.filter';
import {  GqlHttpExceptionFilter } from './utils/exceptionError/auth-exception';
var fs = require('fs');
import * as morgan from 'morgan';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // se copia para poder usar los decoradores en las dto -
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      //para que combierta en numero los queryParams
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  // app.setGlobalPrefix('api');
  const origin = process.env.FRONTEND_ORIGINS
                    ? process.env.FRONTEND_ORIGINS.split(',')
                    : [`http://localhost:${process.env.PORT}`]
  console.log(origin);
  // process.env.SECRETO = require('../localhost.pem')
  // console.log(fs.readFileSync('../localhost.pem'),);
  
  app.enableCors({
    origin,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true
  });
  app.use(morgan('dev')); // Middleware de logging
  // app.useGlobalFilters(new NotFoundExceptionFilter());
  // app.useGlobalInterceptors(new GqlHttpExceptionFilter());
  app.useGlobalFilters(new TypeORMExceptionFilter());
  await app.listen(process.env.PORT);
}
bootstrap();
