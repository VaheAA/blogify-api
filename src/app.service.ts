import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { MikroORM } from '@mikro-orm/core'

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly orm: MikroORM) {}

  async onApplicationBootstrap() {
    try {
      const migrator = this.orm.getMigrator()

      const pendingMigrations = await migrator.getPendingMigrations()
      if (pendingMigrations.length) {
        console.log('Pending migrations:', pendingMigrations)
        await migrator.up()
        console.log('Migrations executed successfully.')
      } else {
        console.log('No pending migrations.')
      }
    } catch (error) {
      console.error('Error running migrations:', error)
      process.exit(1)
    }
  }
}
