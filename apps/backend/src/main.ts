import { ConfigModule, ConfigService, } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule, } from './app/app.module';
import { AppExceptionsFilter, } from './app/utils/app.exceptions.filter';
import { LoggingInterceptor, } from './app/utils/app.logging.interceptor';
import { ResponseInterceptor, } from './app/utils/app.response.interceptor';
import { AppValidationPipe, } from './app/utils/app.validation.pipe';
import { initSwagger, } from './swagger/swagger';

async function init() {
  ConfigModule.forRoot();
  const config = new ConfigService();
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  app.useGlobalFilters(new AppExceptionsFilter(app.get(HttpAdapterHost)));

  app.setGlobalPrefix(config.get<string>('ROUTE_PREFIX') ?? 'api');

  app.useGlobalPipes(new AppValidationPipe());

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  app.use(helmet());

  if (config.getOrThrow<string>('NODE_ENV') !== 'production') {
    initSwagger(app, config);
  }

  await app.startAllMicroservices();
  await app.listen(config.get<number>('SERVER_PORT') ?? 3000);
}

init().catch((error) => console.error(error));
