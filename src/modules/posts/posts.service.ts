import { Injectable } from '@nestjs/common'
import { Post } from './entities/post.entity'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager, EntityRepository } from '@mikro-orm/core'
import { CreatePostDto } from './dto/create-post.dto'
import { parse } from 'ts-jest'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly repo: EntityRepository<Post>,
    private readonly em: EntityManager,
  ) {}

  async create(data: CreatePostDto) {
    const post = this.repo.create(data)

    await this.em.persistAndFlush(post)
    return post
  }

  async findAll() {
    return await this.repo.findAll()
  }

  async findOne(id: string) {
    return await this.repo.findOne({
      id: parseInt(id),
    })
  }

  async findUserPosts(
    userId: string,
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string,
  ) {
    const [posts, total] = await this.em.findAndCount(
      Post,
      { author: parseInt(userId) },
      {
        limit,
        offset: (page - 1) * limit,
        orderBy: { [sortBy]: sortOrder },
      },
    )

    return { posts, total }
  }
}
