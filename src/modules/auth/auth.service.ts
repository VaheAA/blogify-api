import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { JwtService } from '@nestjs/jwt'
import { comparePassword, hashPassword } from '../../shared/utils'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(data: CreateUserDto) {
    const user = await this.usersService.findByEmail(data.email)

    if (user)
      throw new BadRequestException(
        `User with email ${data.email} already exists`,
      )

    return await this.usersService.create({
      ...data,
      password: await hashPassword(data.password),
    })
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)

    if (!user) throw new NotFoundException(`User with email ${email} not found`)

    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) throw new BadRequestException(`Invalid credentials`)

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    }
    const token = await this.jwtService.signAsync(payload)

    await this.usersService.createSession(user, token)

    return {
      access_token: token,
    }
  }

  async signOut(email: string, token: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user) throw new NotFoundException(`User with email ${email} not found`)

    await this.usersService.deleteSession(user, token)
    return { message: 'Signed out successfully' }
  }
}
