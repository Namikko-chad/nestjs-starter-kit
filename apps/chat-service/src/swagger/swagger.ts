import { INestApplication, } from '@nestjs/common';
import { ConfigService, } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule, } from '@nestjs/swagger';

export function initSwagger(app: INestApplication, config: ConfigService) {
  const url = `${config.get<string>('BASE_URL') ?? 'localhost'}:${config.get<string>('SERVER_PORT') ?? 3000}`;
  const routePrefix = config.get<string>('ROUTE_PREFIX') ?? 'api';
  const route = config.get<string>('SWAGGER_PREFIX') ?? 'documentation';
  const documentBuilder = new DocumentBuilder()
    .setTitle('Chat API Documentation')
    .setDescription('Chat API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(`http://${url}/${routePrefix}`)
    .addServer(`https://${url}/${routePrefix}`)
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup(`${routePrefix}/${route}`, app, document);
}
