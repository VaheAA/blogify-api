import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core'

@Entity()
export class User {
  @PrimaryKey()
  id!: number

  @Property({ length: 50 })
  username!: string

  @Property({ length: 100, unique: true })
  @Unique()
  email!: string

  @Property({ hidden: true })
  password!: string

  @Property({ nullable: true })
  avatar?: string

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
