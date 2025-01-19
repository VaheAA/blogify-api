import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as process from 'node:process'
import { Reflector } from '@nestjs/core'
import { UsersService } from '../../modules/users/users.service'
import { extractTokenFromHeader } from '../../shared/utils'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    )
    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException('Token not provided')
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })

      const session = await this.usersService.findSessionByToken(token)
      if (!session) {
        throw new UnauthorizedException('Token is invalid or revoked')
      }

      request['user'] = decoded
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token')
    }

    return true
  }
}
