import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../database/entity/task/task.entity';
import { TaskController } from './controller/task.controller';
import { TaskService } from './task/task.service';
import { getConnectionOptions } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () =>
                Object.assign(await getConnectionOptions(), {
                    autoLoadEntities: true,
                    ssl: true,
                    extra: {
                        ssl: {
                            rejectUnauthorized: false
                        }
                    }
                }),
        }),
        TypeOrmModule.forFeature([Task]),
    ],
    controllers: [TaskController],
    providers: [TaskService],
})
export class TaskModule {}
