import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { CsrfService } from '../service/csrf.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.development.local'],
        }),
        MailerModule.forRoot({
            transport: {
              host: 'smtp.gmail.com',
              port: 465,
              auth: {
                user: process.env.MAILDEV_INCOMING_USER,
                pass: process.env.MAILDEV_INCOMING_PASS,
              },
            },
            preview: true,
          }),
    ],
    providers: [MailService, CsrfService],
    controllers: [MailController],
})
export class MailModule {}
