import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationPipeOptions } from './common/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  const validationOptions: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    disableErrorMessages: false,
  };

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept'],
  });

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  // Start the application normally if not running in a serverless environment
  if (process.env.NEST_ENV !== 'vercel') {
    await app.listen(port || 3000);
  }
}

// Export the handler function as the default export
export default async (req: Request, res: Response) => {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const server = app.getHttpAdapter().getInstance();
  server(req, res);
};

// Start the application normally if not running on Vercel
bootstrap();
