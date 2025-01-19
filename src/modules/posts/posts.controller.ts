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
  async getPosts() {
    return this.postsService.findAll()
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

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return await this.postsService.findOne(id)
  }

  @Put('/:id')
  async updatePost(
    @Param('id') id: string,
    @Body() body: Partial<CreatePostDto>,
  ) {}

  @Delete('/:id')
  async deletePost(@Param('id') id: string) {}
}
