import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../database/entity/account/accont.entity';
import { RegisteredTask } from '../../database/entity/registeredTask/registeredTask.entity';
import { TaskType } from '../../database/entity/task/task.entity';
import { RegisteredTaskDto } from '../../registered-task/dto/registered-task.dto';
import { RegisteredTaskService } from '../../registered-task/service/registered-task.service';
import { AccountDto } from '../dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    private registeredTaskService: RegisteredTaskService,
  ) {}

  async AddRegisteredTaskFromAccount(
    data: RegisteredTaskDto,
  ): Promise<Account | undefined> {
    const existedAccounts = await this.accountRepo.find({
      where: { email: data.email },
      relations: ['registeredTasks'],
    });

    //Couldn't find the account
    if (!existedAccounts || existedAccounts.length === 0) {
      return undefined;
    }

    const targetTask =
      await this.registeredTaskService.GetOrCreateRegisteredTask(
        data.registerTaskType,
      );

    //Already registered
    if (
      existedAccounts[0].registeredTasks.find(
        (task: RegisteredTask) => task.taskType === data.registerTaskType,
      )
    ) {
      return undefined;
    }

    existedAccounts[0].registeredTasks.push(targetTask);

    return await this.accountRepo.save(existedAccounts[0]);
  }

  async RemoveRegisteredTaskFromAccount(data: RegisteredTaskDto) {
    const existedAccounts = await this.accountRepo.find({
      where: { email: data.email },
      relations: ['registeredTasks'],
    });

    existedAccounts[0].registeredTasks =
      existedAccounts[0].registeredTasks.filter(
        (task: RegisteredTask) => task.taskType !== data.registerTaskType,
      );

    return await this.accountRepo.save(existedAccounts[0]);
  }

  async AddAccount(data: AccountDto): Promise<Account> {
    const account = Object.assign(new Account(), {
      email: data.email,
      name: data.name,
      jobType: data.jobType,
      registeredTasks: [],
    });

    return await this.accountRepo.save(account);
  }

  async GetAllAccounts(): Promise<Account[]> {
    return await this.accountRepo.find({
      relations: ['registeredTasks'],
    });
  }

  async GetAccountsByTaskType(taskType: TaskType): Promise<Account[]> {
    const accounts = await this.accountRepo.find({
      relations: ['registeredTasks'],
    });
    const res = accounts.filter(
      (account) =>
        account.registeredTasks.findIndex(
          (task) => task.taskType === taskType,
        ) !== -1,
    );

    return res;
  }

  async GetAccountByMail(mail: string): Promise<Account[]> {
    return await this.accountRepo.find({
      where: { email: mail },
      relations: ['registeredTasks'],
    });
  }
}
