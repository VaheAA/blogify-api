import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { AuthService } from '../auth/auth.service'

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body)
  }
}
