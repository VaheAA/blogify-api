import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { AuthService } from '../auth/auth.service'
import { UsersService } from './users.service'
import { GetCurrentUser } from '../../common/decorators/current-user.decorator'
import { Public } from '../../common/decorators/set-public.decorator'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
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
