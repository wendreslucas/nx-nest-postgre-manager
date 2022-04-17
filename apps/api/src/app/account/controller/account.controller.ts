import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { TaskType } from '@nx-nest-postgre-manager/api-interfaces';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Account } from '../../database/entity/account/accont.entity';
import { RegisteredTaskDto } from '../../registered-task/dto/registered-task.dto';
import { AccountDto } from '../dto/account.dto';
import { AccountService } from '../service/account.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  /*
  Get accounts by task type
  */
  @ApiQuery({ name: 'tasktype', enum: TaskType })
  @ApiQuery({ name: 'email'})
  @Get()
  async GetAccountsByTaskType(@Query() query): Promise<Account[]> {
    if (query.tasktype) {
      return await this.accountService.GetAccountsByTaskType(query.tasktype);
    } else if (query.email) {
      return await this.accountService.GetAccountByMail(query.email);
    } else {
      return await this.accountService.GetAllAccounts();
    }
  }

  /*
  Create a new account
  */
  @ApiBody({ type: AccountDto})
  @Post()
  async CreateAccount(@Body() accountDto: AccountDto) {
    return await this.accountService.AddAccount(accountDto);
  }

  /*
  Register the task for an account
  */
  @ApiBody({ type: RegisteredTaskDto})
  @Post('registertask')
  async AddRegisteredTaskFromAccount(
    @Body() registeredTaskDto: RegisteredTaskDto,
  ) {
    return await this.accountService.AddRegisteredTaskFromAccount(
      registeredTaskDto,
    );
  }

  /*
  Unregister the task for an account
  */
  @ApiBody({ type: RegisteredTaskDto})
  @Post('unregistertask')
  async RemoveRegisteredTaskFromAccount(
    @Body() registeredTaskDto: RegisteredTaskDto,
  ) {
    return await this.accountService.RemoveRegisteredTaskFromAccount(
      registeredTaskDto,
    );
  }
}
