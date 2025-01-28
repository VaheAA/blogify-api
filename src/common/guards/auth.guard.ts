import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { UsersService } from '../../modules/users/users.service'
import { extractTokenFromHeader } from '../../shared/utils'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    )
    if (isPublic) return true

    const request = context.switchToHttp().getRequest()
    const token = extractTokenFromHeader(request)

    if (!token) {
      throw new UnauthorizedException('Authorization token is required')
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })

      if (Date.now() >= decoded.exp * 1000) {
        throw new UnauthorizedException(
          'Token has expired, please log in again',
        )
      }

      const session = await this.usersService.findSessionByToken(token)
      if (!session) {
        throw new UnauthorizedException('Invalid or revoked token')
      }

      request.user = decoded
      return true
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Invalid or expired token',
      )
    }
  }
}
