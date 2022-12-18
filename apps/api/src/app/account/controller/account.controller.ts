import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotAcceptableException, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { TaskType } from '@nx-nest-postgre-manager/api-interfaces';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Account } from '../../database/entity/account/accont.entity';
import { RegisteredTaskDto } from '../../registered-task/dto/registered-task.dto';
import { AccountDto } from '../dto/account.dto';
import { AccountService } from '../service/account.service';
import { Csrf } from "ncsrf";
import { MailService } from '../../mail/mail.service';
import { MailDto } from '../../mail/dto/mail.dto';
import { RefererGuard } from '../../auth/guard/referer.guard';
import RoleGuard from '../service/guard/role-guard';
import { Role } from '../../user/dto/user.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/account')
export class AccountController {
  constructor(
    private accountService: AccountService,
    private mailService: MailService
  ) { }

  /*
  Get accounts by task type
  */
  @ApiQuery({ name: 'tasktype', enum: TaskType })
  @ApiQuery({ name: 'email' })
  @UseGuards(RefererGuard, RoleGuard(Role.Dashboard))
  @Csrf()
  @Get()
  async getAccountsByTaskType(@Query() query): Promise<Account[]> {
    if (query.tasktype) {
      return await this.accountService.getAccountsByTaskType(query.tasktype);
    } else if (query.email) {
      return await this.accountService.getAccountByMail(query.email);
    } else {
      return await this.accountService.getAllAccounts();
    }
  }

  /*
  Create a new account
  */
  // @Csrf()
  @ApiBody({ type: AccountDto})
  @Post()
  @UseGuards(RefererGuard, RoleGuard(Role.Widget))
  async createAccount(@Body() accountDto: AccountDto) {
    const res = await this.accountService.getAccountByMail(accountDto.email);
    if (res.length !== 0) {
      throw new BadRequestException('This email has ready in used!');
    }
    this.mailService.sendCustomizedMail(
      Object.assign(
        new MailDto(),
        this.mailService.welcomeLetterData,
        {
          recipient: accountDto.email
        })
    );
    return await this.accountService.addAccount(accountDto)
  }

  /*
  Register the task for an account
  */
  @ApiBody({ type: RegisteredTaskDto})
  @Post('registertask')
  async addRegisteredTaskFromAccount(
    @Body() registeredTaskDto: RegisteredTaskDto,
  ) {
    return await this.accountService.addRegisteredTaskFromAccount(
      registeredTaskDto,
    );
  }

  /*
  Unregister the task for an account
  */
  @ApiBody({ type: RegisteredTaskDto})
  @Post('unregistertask')
  async removeRegisteredTaskFromAccount(
    @Body() registeredTaskDto: RegisteredTaskDto,
  ) {
    return await this.accountService.removeRegisteredTaskFromAccount(
      registeredTaskDto,
    );
  }

  /*
  Delete account by email
  */
  @ApiQuery({ name: 'email' })
  @Csrf()
  @Delete()
  deleteAccount(@Query() query): Promise<Account[]> {
    return this.accountService.deleteAccount(query.mail);
  }
}
