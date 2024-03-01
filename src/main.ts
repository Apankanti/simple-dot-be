import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER } from './common/constants/swagger-schema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const servicePort = 3000;

  const swaggerConfig = new DocumentBuilder()
    .setTitle(SWAGGER.TITLE)
    .setVersion(SWAGGER.VERSION)
    .addServer(SWAGGER.SERVERS.LOCAL)
    .addServer(SWAGGER.SERVERS.DEV)
    .addServer(SWAGGER.SERVERS.STAGING)
    .addServer(SWAGGER.SERVERS.PRODUCTION)
    .addBearerAuth(
      {
        type: 'http',
        scheme: SWAGGER.SCHEME.TYPE,
        bearerFormat: SWAGGER.SCHEME.FORMAT,
      },
      SWAGGER.SCHEME.IDENTIFIER,
    )
    .build();
  const documentation = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentation, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

  await app.listen(servicePort, () => {
    logger.log(`Listening on port ${servicePort}`);
  });

  logger.log(`Swagger UI available at http://localhost:${servicePort}/api`);
}

bootstrap();
