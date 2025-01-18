import { Injectable } from '@nestjs/common'
import { EntityManager, EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async create(data: CreateUserDto) {
    const user = this.repo.create(data)

    await this.em.persistAndFlush(user)
    return user
  }

  findByEmail(email: string) {
    return this.repo.findOne({
      email,
    })
  }
}
