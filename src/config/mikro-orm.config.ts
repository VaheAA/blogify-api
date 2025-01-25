import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import * as process from 'node:process'

const config = {
  entities: ['./dist/**/*.entity.js'], // Path to compiled entities
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: process.env.MIKRO_ORM_POSTGRES_DB,
  user: process.env.MIKRO_ORM_POSTGRES_USER,
  password: process.env.MIKRO_ORM_POSTGRES_PASSWORD,
  driver: PostgreSqlDriver,
  clientUrl: process.env.MIKRO_ORM_DATABASE_URL,
  host: process.env.MIKRO_ORM_DB_HOST || 'db',
  port: parseInt(process.env.MIKRO_ORM_PORT) || 5432,
  debug: process.env.NODE_ENV !== 'production',
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './migrations',
    pathTs: './src/database/migrations',
  },
}

export default config
