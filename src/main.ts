import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationPipeOptions } from './common/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function createApp() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

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

  return { app, port };
}

// Export the handler function for Vercel
export default async (req: Request, res: Response) => {
  const { app } = await createApp();
  await app.init();
  const server = app.getHttpAdapter().getInstance();
  server(req, res);
};

// Start the application normally if not running on Vercel
if (process.env.NEST_ENV !== 'vercel') {
  createApp().then(({ app, port }) => {
    app.listen(port || 3000, () => {
      console.log(`App is running on port ${port || 3000}`);
    });
  });
}
