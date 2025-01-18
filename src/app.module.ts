import { Module, ValidationPipe } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
// import { ConfigModule, ConfigService } from '@nestjs/config'
import config from './config/mikro-orm.config'
import { UsersModule } from './modules/users/users.module'
import { APP_PIPE } from '@nestjs/core'

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: `.env.${process.env.NODE_ENV}`,
    // }),
    // MikroOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     dbName: configService.get('POSTGRES_DB'),
    //     user: configService.get('POSTGRES_USER'),
    //     password: configService.get('POSTGRES_PASSWORD'),
    //     ...config,
    //   }),
    // }),
    MikroOrmModule.forRoot(config),
    UsersModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
