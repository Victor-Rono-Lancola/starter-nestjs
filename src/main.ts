import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

const port = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      '*',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:4200',
      'https://shop.pedeapetroleum.com/home',
      'https://pedea-api-production-2374.up.railway.app',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    // credentials: true
  });
  await app.listen(port, '0.0.0.0');
}
bootstrap();
