/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TaskModule } from './app/task/task.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule);
  //const globalPrefix = 'api';
  //app.setGlobalPrefix(globalPrefix);
  app.set('view engine', 'html');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.engine('html', require('ejs').renderFile);

  const options = new DocumentBuilder()
  .setTitle('API documents')
  .setDescription('The API description')
  .setVersion('1.0')
  .addTag('TaskController')
  .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [
      TaskModule,
    ],
  });
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
