import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { AuthService } from '../auth/auth.service'
import { UsersService } from './users.service'
import { GetCurrentUser } from '../../common/decorators/current-user.decorator'
import { Public } from '../../common/decorators/set-public.decorator'

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

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
  async getProfile(@GetCurrentUser() user: any) {
    return this.userService.findByEmail(user.email)
  }
}
