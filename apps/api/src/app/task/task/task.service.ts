import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '@nx-nest-postgre-manager/api-interfaces';
import { Repository } from 'typeorm';
import { Task } from '../../database/entity/task/task.entity';
import { TaskDto } from '../dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async AddTask(data: TaskDto) {
    return await this.taskRepo.save(
      Object.assign(new Task(), {
        taskType: data.taskType,
      }),
    );
  }

  async GetAllTasks(): Promise<Task[]> {
    return await this.taskRepo.find();
  }

  async GetTaskById(id: number): Promise<Task> {
      return await this.taskRepo.findOneBy({id: id});
  }

  async RemoveTaskById(id: number): Promise<void> {
    await this.taskRepo.delete(id);
  }

  async UpdateStatus(id: number, status: Status) {
    const task = await this.taskRepo.findOneBy({id: id});
      await this.taskRepo.update(id, {
          ...task,
          status,
          "updatedAt": new Date().toISOString()
      });
    return await this.taskRepo.findOneBy({id: id});
  }
}
