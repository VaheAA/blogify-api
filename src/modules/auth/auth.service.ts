import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { JwtService } from '@nestjs/jwt'

const scrypt = promisify(_scrypt)

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

    const salt = randomBytes(8).toString('hex')
    const hash = (await scrypt(data.password, salt, 32)) as Buffer

    const result = salt + '.' + hash.toString('hex')

    return await this.usersService.create({ ...data, password: result })
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)

    if (!user) throw new NotFoundException(`User with email ${email} not found`)

    const [salt, storedHash] = user.password.split('.')

    const hash = (await scrypt(password, salt, 32)) as Buffer

    if (hash.toString('hex') !== storedHash)
      throw new BadRequestException(`Invalid credentials`)

    const payload = { sub: user.id, username: user.name, email: user.email }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
