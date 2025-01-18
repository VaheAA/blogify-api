import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const config = {
  entities: ['./dist/**/*.entity.js'], // Path to compiled entities
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: 'blogify',
  user: 'postgres',
  password: 'postgres',
  driver: PostgreSqlDriver,
  host: 'db',
  port: 5432,
  debug: process.env.NODE_ENV !== 'production',
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './migrations',
    pathTs: './src/database/migrations',
  },
};

console.log(config);

export default config;
