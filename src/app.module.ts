import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/scheme.gql'),
      context: ({ req }) => {
        // console.log('user', req.headers.authorization); // <-- this is always undefined
        return ({ req });
      },
      // autoSchemaFile: true,
      playground: !(process.env.PLAY_GROUND ==='false'),
      plugins: [
        ApolloServerPluginLandingPageLocalDefault({
          footer: !(process.env.PLUGINS_FOOTER === 'false')
        }),
      ]
    }),
    TypeOrmModule.forRoot({
      ...ormconfig
    }),
    // AuthModule,
    UsersModule,
    CompaniesModule,
    RolesModule,
    RutinesModule,
    RutinesTypeModule,
    ExercisesModule,
    ProgressModule,
    AuthModule,
    ExercisesByRutineModule,
    // SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
