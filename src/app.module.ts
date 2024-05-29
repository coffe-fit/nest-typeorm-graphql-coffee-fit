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
import { GqlHttpExceptionFilter } from './utils/exceptionError/auth-exception';

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
        const graphQLFormattedError = {
          message: error.message,
          path: error.path,
          extensions: {
            code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
            status: error.extensions?.originalError?.statusCode || 500,
            error: error.extensions?.originalError?.error || error.name,
          },
        };
        return graphQLFormattedError;
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
    // SeedModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: GraphQLExceptionInterceptor,
      
    // },
    {
      provide: APP_FILTER,
      useClass: GqlHttpExceptionFilter,
    },
  ],
})
export class AppModule {}
