import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationPipeOptions } from './common/interfaces/user.interface';
import { ConfigService } from '@nestjs/config';

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
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  await app.listen(port || 3000);
}
bootstrap();
