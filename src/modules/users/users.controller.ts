import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { AuthService } from '../auth/auth.service'
import { UsersService } from './users.service'
import { GetCurrentUser } from '../../common/decorators/current-user.decorator'
import { Public } from '../../common/decorators/set-public.decorator'
import { UpdateUserDto } from './dto/update-user.dto'
import { extractTokenFromHeader } from '../../shared/utils'
import { Request } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { FileUploadService } from '../file-upload/file-upload.service'

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Public()
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.authService.signUp(body)
  }

  @Public()
  @Post('/signin')
  async login(@Body() body: Partial<CreateUserDto>) {
    return this.authService.signIn(body.email, body.password)
  }

  @Post('/signout')
  async signOut(@Req() request: Request) {
    const token = extractTokenFromHeader(request)
    const user = request['user'] // User is attached by AuthGuard

    if (!token) {
      throw new UnauthorizedException('Token not provided')
    }

    await this.authService.signOut(user.email, token)

    return { message: 'Signed out successfully' }
  }

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @GetCurrentUser() user: { sub: string; email: string },
  ) {
    const userId = user.sub

    const result = await this.fileUploadService.uploadFile(
      file,
      parseInt(userId),
    )
    const avatarUrl = result.secure_url

    await this.userService.updateAvatar(parseInt(userId), avatarUrl)

    return { message: 'Avatar uploaded successfully', avatar: avatarUrl }
  }

  @Get('/profile')
  async getProfile(
    @GetCurrentUser() currentUser: { sub: string; email: string },
  ) {
    const user = await this.userService.findByEmail(currentUser.email)
    if (!user) throw new NotFoundException('User not found')

    return user
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: Partial<UpdateUserDto>,
  ) {
    return this.userService.update(id, body)
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
