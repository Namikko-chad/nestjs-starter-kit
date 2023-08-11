import { NestFactory, } from '@nestjs/core';

import {AppModule} from './app/app.module';

async function init() {
  const app = await NestFactory.createApplicationContext(AppModule);
  app.enableShutdownHooks();

  await app.init();
}

init().catch((error) => console.error(error));
