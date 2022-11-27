/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TaskModule } from './app/task/task.module';
import { AuthModule } from './app/auth/auth.module';
import { AccountModule } from './app/account/account.module';

import { nestCsrf, CsrfFilter } from 'ncsrf';
import * as cookieParser from 'cookie-parser'
import { MailModule } from './app/mail/mail.module';
import { NotFoundFilter } from './app/service/filter/not-found.filter';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule);
  app.use(cookieParser());
  app.use(nestCsrf());
  //app.useGlobalFilters(new CsrfFilter());
  app.useGlobalFilters(new NotFoundFilter());

  //enable CORS
  app.enableCors();


  //const globalPrefix = 'api';
  //app.setGlobalPrefix(globalPrefix);
  app.set('view engine', 'html');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  app.engine('html', require('ejs').renderFile);

  app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalGuards(new RefererGuard());

  const options = new DocumentBuilder()
  .setTitle('Account management API documents')
  .setDescription('The API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [
      TaskModule,
      AuthModule,
      AccountModule,
      MailModule
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
