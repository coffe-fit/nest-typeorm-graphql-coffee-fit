import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';

// // import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { RolesModule } from './roles/roles.module';
import { RutinesModule } from './rutines/rutines.module';
import { RutinesTypeModule } from './rutines_type/rutines_type.module';
import { ExercisesModule } from './exercises/exercises.module';
// // import { SeedModule } from './seed/seed.module';
import { ProgressModule } from './progress/progress.module';

import {options as ormconfig} from '../ormconfig';
import { AuthModule } from './auth/auth.module';
import { ExercisesByRutineModule } from './exercises-by-rutine/exercises-by-rutine.module';

import { SeedModule } from './seed/seed.module';
import { GraphQLExceptionInterceptor } from './utils/exceptionError/not-found-exception.filter';
import { GqlBadRequestExceptionFilter, GqlHttpExceptionFilter } from './utils/exceptionError/auth-exception';
import { ExercisesMetricsModule } from './exercises-metrics/exercises-metrics.module';
import { TypeORMExceptionFilter } from './typeorm-exceptions.filter';
import { ApolloError } from 'apollo-server-express';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/scheme.gql'),
      // context: ({ req }) => {
      //   // console.log('user', req.headers.authorization); // <-- this is always undefined
      //   return ({ req });
      // },
      // autoSchemaFile: true,
      playground: !(process.env.PLAY_GROUND ==='false'),
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({
          footer: !(process.env.PLUGINS_FOOTER === 'false')
        }),
      ],
      context: ({ req, res }) => ({ req, res }),
      formatError: (error: any) => {
        const originalError = error.originalError;
        if (originalError instanceof ApolloError) {
          return originalError;
        }

        return new ApolloError(error.message, 'BAD_USER_INPUT', {
          exception: error.extensions.exception,
        });
      },
      // formatError: (error) => {
      //   const { extensions } = error;
      //   const exception = extensions?.exception || {};

      //   return {
      //     message: error.message,
      //     path: error.path,
      //     extensions: {
      //       statusCode: 500,
      //       error: 'InternalServerError',
      //     },
      //   };
      // },
    }),
    TypeOrmModule.forRoot({
      ...ormconfig
    }),
    UsersModule,
    CompaniesModule,
    RolesModule,
    RutinesModule,
    RutinesTypeModule,
    ExercisesModule,
    ProgressModule,
    AuthModule,
    ExercisesByRutineModule,
    SeedModule,
    ExercisesMetricsModule,
    // SeedModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: GqlHttpExceptionFilter,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: GqlBadRequestExceptionFilter,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: TypeORMExceptionFilter,
    // },
  ],
})
export class AppModule {}
