import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'
import { Public } from '../../common/decorators/set-public.decorator'
import { GetCurrentUser } from '../../common/decorators/current-user.decorator'
import { UpdatePostDto } from './dto/update-post.dto'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(
    @GetCurrentUser() currentUser: { sub: string; email: string },
    @Body() body: CreatePostDto,
  ) {
    const postData = {
      ...body,
      author: currentUser.sub,
    }

    return this.postsService.create(postData)
  }

  @Public()
  @Get()
  async getPosts(
    @Query('query') query: string,
    @Query('tags') tags: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '9',
    @Query('sortBy') sortBy = 'createdAt',
    @Query('sortOrder') sortOrder = 'DESC',
  ) {
    return this.postsService.findAll(
      query,
      tags,
      parseInt(page),
      parseInt(limit),
      sortBy,
      sortOrder,
    )
  }

  @Get('/my-posts')
  async getUserPosts(
    @GetCurrentUser() currentUser: { sub: string; email: string },
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sortBy') sortBy = 'createdAt',
    @Query('sortOrder') sortOrder = 'DESC',
  ) {
    return await this.postsService.findUserPosts(
      currentUser.sub,
      page,
      limit,
      sortBy,
      sortOrder,
    )
  }

  @Public()
  @Get('/tags')
  async getTags() {
    return await this.postsService.findAllTags()
  }

  @Public()
  @Get(':id')
  async getPost(@Param('id') id: string) {
    return await this.postsService.findOne(id)
  }

  @Put('/:id')
  async updatePost(
    @Param('id') id: string,
    @GetCurrentUser() currentUser: { sub: string; email: string },
    @Body() body: Partial<UpdatePostDto>,
  ) {
    return await this.postsService.update(id, currentUser.sub, body)
  }

  @Delete('/:id')
  async deletePost(
    @Param('id') id: string,
    @GetCurrentUser() currentUser: { sub: string; email: string },
  ) {
    return await this.postsService.remove(id, currentUser.sub)
  }
}
