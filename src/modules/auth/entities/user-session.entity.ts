import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core'
import { User } from '../../users/entities/user.entity'

@Entity({ tableName: 'user_sessions' })
export class UserSession {
  @PrimaryKey()
  id!: number

  @ManyToOne(() => User, { nullable: false })
  user!: User

  @Property({ columnType: 'text' })
  token!: string

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date()
}
