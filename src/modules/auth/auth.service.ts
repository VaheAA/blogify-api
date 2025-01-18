import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'
import { CreateUserDto } from '../users/dto/create-user.dto'

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(data: CreateUserDto) {
    const users = await this.usersService.findByEmail(data.email)

    if (users)
      throw new BadRequestException(
        `User with email ${data.email} already exists`,
      )

    const salt = randomBytes(8).toString('hex')
    const hash = (await scrypt(data.password, salt, 32)) as Buffer

    const result = salt + '.' + hash.toString('hex')

    return await this.usersService.create({ ...data, password: result })
  }
}
