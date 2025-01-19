import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Post } from './entities/post.entity'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityManager, EntityRepository } from '@mikro-orm/core'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { LIMIT } from '../../shared/constants'

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

  async findAll(
    page: number = 1,
    limit: number = LIMIT,
    sortBy: string,
    sortOrder: string,
  ) {
    return await this.em.findAndCount(
      Post,
      {},
      {
        limit,
        offset: (page - 1) * limit,
      },
    )
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

  async update(id: string, userId: string, data: Partial<UpdatePostDto>) {
    const post = await this.em.findOne(
      Post,
      { id: parseInt(id) },
      { populate: ['author'] },
    )

    if (!post) throw new NotFoundException(`Post with id ${id} not found`)

    if (post.author.id !== parseInt(userId))
      throw new ForbiddenException('You are not allowed to update this post')

    Object.assign(post, data)

    await this.em.flush()

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      isPublished: post.isPublished,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }
  }

  async remove(id: string, userId: string) {
    const post = await this.em.findOne(
      Post,
      { id: parseInt(id) },
      { populate: ['author'] },
    )

    if (!post) throw new NotFoundException(`Post with id ${id} not found`)

    if (post.author.id !== parseInt(userId))
      throw new ForbiddenException('You are not allowed to remove this post')

    return this.em.removeAndFlush(post)
  }

  async search(
    query: string,
    tags: string[] = [],
    page: number = 1,
    limit: number = 10,
  ) {
    const filters: any = {}

    if (query) {
      filters.title = { $fulltext: `%${query}%` }
    }

    if (tags.length > 0) {
      filters.tags = { $contains: tags }
    }

    const [posts, total] = await this.repo.findAndCount(filters, {
      limit,
      offset: (page - 1) * limit,
      orderBy: { createdAt: 'DESC' },
    })

    return { posts, total }
  }
}
