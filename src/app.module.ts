import { Module, ValidationPipe } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { UsersModule } from './modules/users/users.module'
import { APP_GUARD, APP_PIPE } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { AuthGuard } from './common/guards/auth.guard'
import { PostsModule } from './modules/posts/posts.module'
import { ConfigModule } from '@nestjs/config'
import config from './config/mikro-orm.config'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MikroOrmModule.forRoot(config),
    UsersModule,
    PostsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '50000060s' },
    }),
  ],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
