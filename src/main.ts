import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import { createLogger, format, transports } from 'winston';

import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { UncaughtExceptionFilter } from './uncaught-exception.filter';
import SentryTransport from 'winston-transport-sentry-node';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const instance = createLogger({
    transports: [
      new transports.Console({
        level: 'debug',
        format: format.combine(
          format.timestamp(),
          format.ms(),
          utilities.format.nestLike('MyApp', {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
      new SentryTransport({
        sentry: {
          dsn: 'https://394dd78a185645778c3a5d089efc6894@o195569.ingest.sentry.io/4505588774928384',
        },
        level: 'error',
      }),
      // new transports.Console({
      //   level: 'error',
      //   format: format.combine(
      //     format.timestamp(),
      //     format.ms(),
      //     utilities.format.nestLike('MyApp', {
      //       colors: true,
      //       prettyPrint: true,
      //     }),
      //   ),
      // }),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance,
    }),
  });

  const config = new DocumentBuilder().setTitle('Seller Center').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new UncaughtExceptionFilter());
  await app.listen(3003);
}

bootstrap();
