import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Post } from './entities/post.entity'
import { PostsService } from './posts.service'
import { PostsController } from './posts.controller'

@Module({
  imports: [MikroOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
