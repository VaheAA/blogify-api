import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { UsersController } from './users.controller'
import { AuthService } from '../auth/auth.service'
import { UserSession } from '../auth/entities/user-session.entity'

@Module({
  imports: [MikroOrmModule.forFeature([User, UserSession])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
