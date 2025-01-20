import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as process from 'node:process'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const port = parseInt(process.env.PORT) || 8080
  await app.listen(port)
}
bootstrap()
