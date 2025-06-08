import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Just-My-Shots')
    .setDescription('Стажировочный проект')
    .setVersion('1.0')
    .addTag('just')
    .addBearerAuth()
    .addCookieAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1', app, documentFactory, {
    customSiteTitle: 'JustMyShots Swagger',
  });
}
