import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Index,
  ManyToMany,
  Collection,
} from '@mikro-orm/core'
import { User } from '../../users/entities/user.entity'
import { Tag } from './tag.entity'

@Entity()
export class Post {
  @PrimaryKey()
  id!: number

  @Index({ type: 'fulltext' })
  @Property({ length: 255 })
  title!: string

  @Property({ columnType: 'text' })
  content!: string

  @ManyToOne(() => User)
  author!: User

  @ManyToMany(() => Tag, (tag) => tag.posts, { owner: true })
  tags = new Collection<Tag>(this)

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
