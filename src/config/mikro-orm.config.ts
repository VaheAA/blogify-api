import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'

const config = {
  entities: ['./dist/**/*.entity.js'], // Path to compiled entities
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: process.env.MIKRO_ORM_POSTGRES_DB,
  user: process.env.MIKRO_ORM_POSTGRES_USER,
  password: process.env.MIKRO_ORM_POSTGRES_PASSWORD,
  driver: PostgreSqlDriver,
  clientUrl: process.env.MIKRO_ORM_DATABASE_URL,
  debug: process.env.NODE_ENV !== 'production',
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './migrations',
    pathTs: './src/database/migrations',
  },
}

if (process.env.NODE_ENV !== 'production') {
  config['host'] = 'db'
  config['port'] = 5432
}

export default config
