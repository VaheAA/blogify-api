import { Injectable, NotFoundException } from '@nestjs/common'
import { EntityManager, EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserSession } from '../auth/entities/user-session.entity'

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

  async update(id: string, data: Partial<UpdateUserDto>) {
    const user = await this.repo.findOne({
      id: parseInt(id),
    })

    if (!user) throw new NotFoundException(`User with id ${id}`)

    Object.assign(user, data)

    await this.em.flush()

    return user
  }

  async remove(id: string) {
    const user = await this.repo.findOne({ id: parseInt(id) })

    if (!user) throw new NotFoundException(`User with id ${id} not found`)

    return this.em.removeAndFlush(user)
  }

  async updateAvatar(userId: number, avatarPath: string) {
    const user = await this.em.findOne(User, { id: userId })
    if (!user) throw new NotFoundException(`User not found`)
    user.avatar = avatarPath
    await this.em.flush()
  }

  async createSession(user: User, token: string) {
    const session = this.em.create(UserSession, { user, token })
    await this.em.persistAndFlush(session)
  }

  async findSessionByToken(token: string): Promise<UserSession | null> {
    return await this.em.findOne(UserSession, { token })
  }

  async deleteSession(user: User, token: string) {
    const session = await this.em.findOne(UserSession, { user, token })
    if (session) {
      await this.em.removeAndFlush(session)
    }
  }
}
