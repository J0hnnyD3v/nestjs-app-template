import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import metadata from './metadata';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT', '3000');

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Nest JS Template')
    .setDescription('The Nest JS API description')
    .setVersion('1.0')
    .build();

  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, '0.0.0.0');

  const logger = app.get(Logger);
  logger.log(`App is ready and listening on port ${port} 🚀`);
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
}

process.on('uncaughtException', handleError);
