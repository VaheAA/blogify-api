import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  await app.listen(process.env.PORT || 8080)
}
void bootstrap()
