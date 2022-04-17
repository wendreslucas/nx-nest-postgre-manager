import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../database/entity/task/task.entity';
import { TaskController } from './controller/task.controller';
import { TaskService } from './task/task.service';
import { getConnectionOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Account } from '../database/entity/account/accont.entity';
import { RegisteredTask } from '../database/entity/registeredTask/registeredTask.entity';

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

              return settings;
            },
            inject: [ConfigService],
          }),
        TypeOrmModule.forFeature([Task])
    ],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
