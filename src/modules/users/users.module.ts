import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { UsersController } from './users.controller'
import { AuthService } from '../auth/auth.service'
import { UserSession } from '../auth/entities/user-session.entity'
import { FileUploadService } from '../file-upload/file-upload.service'
import { CloudinaryModule } from '../cloudinary/cloudinary.module'

@Module({
  imports: [MikroOrmModule.forFeature([User, UserSession]), CloudinaryModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService, FileUploadService],
  exports: [UsersService],
})
export class UsersModule {}
