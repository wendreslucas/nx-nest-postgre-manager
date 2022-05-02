import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { CsrfService } from './service/csrf.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'views'),
    }),
    TaskModule,
    AuthModule,
    AccountModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [CsrfService],
})
export class AppModule {}
