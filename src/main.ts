import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Express from 'express';
import * as cors from 'cors';

const server = Express();
server.use(cors());
server.get('/', (req, res) => res.send('ok'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
