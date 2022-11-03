import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPackedSettings } from 'http2';
import { getConnectionOptions } from 'typeorm';
import { Account } from '../database/entity/account/accont.entity';
import { RegisteredTask } from '../database/entity/registeredTask/registeredTask.entity';
import { Task } from '../database/entity/task/task.entity';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { RegisteredTaskService } from '../registered-task/service/registered-task.service';
import { CsrfService } from '../service/csrf.service';
import { DeployedPlatform } from '../service/enum/DeployedPlatform';
import { AccountController } from './controller/account.controller';
import { AccountService } from './service/account.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        let settings = Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        })
        if ((configService.get<string>('isProd').toLocaleLowerCase() == 'true') &&
            (configService.get<string>('platform').toLocaleLowerCase() !== DeployedPlatform.fly)) {
            settings = Object.assign(settings, {
              ssl: true,
              extra: {
                ssl: {
                    rejectUnauthorized: false
                }
              }
            })
        }

        return settings;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Account]),
    TypeOrmModule.forFeature([RegisteredTask]),
    MailModule,
    ConfigModule.forRoot({
        envFilePath: ['.env.development.local'],
    }),
  ],
  providers: [AccountService, RegisteredTaskService, CsrfService, MailService],
  controllers: [AccountController]
})
export class AccountModule {}
