import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://blogify-client-gamma.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })

  await app.listen(process.env.PORT || 8080)
}
void bootstrap()
