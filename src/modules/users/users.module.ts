import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { UsersController } from './users.controller'
import { AuthService } from '../auth/auth.service'

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
