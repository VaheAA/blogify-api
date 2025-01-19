import { Entity, PrimaryKey, Property, ManyToOne, Index } from '@mikro-orm/core'
import { User } from '../../users/entities/user.entity'

@Entity()
export class Post {
  @PrimaryKey()
  id!: number

  @Index({ type: 'fulltext' })
  @Property({ length: 255 })
  title!: string

  @Property({ columnType: 'text' })
  content!: string

  @Property({ default: true })
  isPublished: boolean = true

  @ManyToOne(() => User)
  author!: User

  @Property({ type: 'json' })
  tags: string[] = []

  @Property({ nullable: true })
  cover?: string

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
