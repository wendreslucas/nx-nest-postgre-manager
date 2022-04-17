import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPackedSettings } from 'http2';
import { getConnectionOptions } from 'typeorm';
import { Account } from '../database/entity/account/accont.entity';
import { RegisteredTask } from '../database/entity/registeredTask/registeredTask.entity';
import { Task } from '../database/entity/task/task.entity';
import { RegisteredTaskService } from '../registered-task/service/registered-task.service';
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
        if (configService.get<string>('isProd').toLocaleLowerCase() == 'true') {
          settings = Object.assign(settings, {
            ssl: true,
            extra: {
                ssl: {
                    rejectUnauthorized: false
                }
            }
          })
        }

        console.log(settings)
        return settings;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Account]),
    TypeOrmModule.forFeature([RegisteredTask]),
  ],
  providers: [AccountService, RegisteredTaskService],
  controllers: [AccountController]
})
export class AccountModule {}
