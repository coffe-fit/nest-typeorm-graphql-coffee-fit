import { DataSource, DataSourceOptions } from "typeorm"
require ('dotenv').config();

const postgresDB: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST, // Reemplaza con el host de Render
  port: +process.env.DB_PORT | 5432, // Puerto predeterminado de PostgreSQL
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // autoLoadEntities: true,
  entities: [`${process.env.DB_MIGRATION === 'true'?"src":"dist"}/**/*.entity{.ts,.js}`],
  logging: true,
  synchronize: process.env.DB_NAME === 'true', // Esto crea las tablas automáticamente (en producción, establecer en false)
  migrationsTableName: "migrations",
  migrations: ['./db/migrations/*.ts'],
  ssl: {
    rejectUnauthorized: false
  },
}

export const options: DataSourceOptions = { ...postgresDB }

export const dataSource = new DataSource(
  options as DataSourceOptions
);