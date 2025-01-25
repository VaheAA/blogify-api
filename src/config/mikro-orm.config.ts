import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { Migrator } from '@mikro-orm/migrations'

const config = {
  extensions: [Migrator],
  entities: ['./dist/**/*.entity.js'], // Path to compiled entities
  entitiesTs: ['./src/**/*.entity.ts'],
  dbName: process.env.MIKRO_ORM_POSTGRES_DB,
  user: process.env.MIKRO_ORM_POSTGRES_USER,
  password: process.env.MIKRO_ORM_POSTGRES_PASSWORD,
  clientUrl: process.env.MIKRO_ORM_POSTGRES_URL,
  driver: PostgreSqlDriver,
  debug: process.env.NODE_ENV !== 'production',
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './dist/database/migrations',
    pathTs: './src/database/migrations',
  },
}

export default config
