import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  const servicePort = 3000 | 3001;
  await app.listen(servicePort, () => {
    logger.log(`Listening on port ${servicePort}`);
  });

  const config = new DocumentBuilder()
    .setTitle('Simple Ecommerce Service')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('Simple Ecommerce Service')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
bootstrap();
