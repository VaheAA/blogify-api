import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core'
import { Post } from './post.entity'

@Entity()
export class Tag {
  @PrimaryKey()
  id!: number

  @Property({ unique: true })
  name!: string

  @ManyToMany(() => Post, (post) => post.tags)
  posts = new Collection<Post>(this)
}
