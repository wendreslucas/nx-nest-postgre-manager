/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisteredTask } from '../../database/entity/registeredTask/registeredTask.entity';
import { TaskType } from '../../database/entity/task/task.entity';

@Injectable()
export class RegisteredTaskService {
  constructor(
    @InjectRepository(RegisteredTask)
    private readonly registeredTaskRepo: Repository<RegisteredTask>,
  ) {}

  async GetOrCreateRegisteredTask(
    registerTaskType: TaskType,
  ): Promise<RegisteredTask> {
    //Check if the task type has existed
    const existedTasks = await this.registeredTaskRepo.find({
      where: { taskType: registerTaskType },
      relations: ['accounts'],
    });

    if (!(existedTasks && existedTasks.length !== 0)) {
      const targetTask: RegisteredTask = Object.assign(new RegisteredTask(), {
        taskType: registerTaskType,
        description: registerTaskType,
        accounts: [],
      });
      return await this.registeredTaskRepo.save(targetTask);
    }

    return existedTasks[0];
  }
}
