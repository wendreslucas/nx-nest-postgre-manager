import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotAcceptableException, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { TaskType } from '@nx-nest-postgre-manager/api-interfaces';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Account } from '../../database/entity/account/accont.entity';
import { RegisteredTaskDto } from '../../registered-task/dto/registered-task.dto';
import { CsrfService } from '../../service/csrf.service';
import { AccountDto } from '../dto/account.dto';
import { AccountService } from '../service/account.service';
import { Csrf } from "ncsrf";
import { MailService } from '../../mail/mail.service';
import { MailDto } from '../../mail/dto/mail.dto';
import { RefererGuard } from '../../auth/guard/referer.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/account')
export class AccountController {
  constructor(
    private accountService: AccountService,
    private csrfService: CsrfService,
    private mailService: MailService
  ) { }

  /*
  Get accounts by task type
  */
  @ApiQuery({ name: 'tasktype', enum: TaskType })
  @ApiQuery({ name: 'email' })
  @Csrf()
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
  Get CSRF token
  */
  @Get('csrf-token')
  GetCsrfToken(@Req() req): any {
    return this.csrfService.GetCsrfToken(req);
  }

  /*
  Create a new account
  */
  // @Csrf()
  @ApiBody({ type: AccountDto})
  @Post()
  @UseGuards(RefererGuard)
  async CreateAccount(@Body() accountDto: AccountDto) {
    const res = await this.accountService.GetAccountByMail(accountDto.email);
    if (res.length !== 0) {
      throw new NotAcceptableException('This email has ready in used!');
    }
    this.mailService.sendCustomizedMail(
      Object.assign(
        new MailDto(),
        this.mailService.welcomeLetterData,
        {
          recipient: accountDto.email
        })
    );
    return await this.accountService.AddAccount(accountDto)
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

  /*
  Delete account by email
  */
  @ApiQuery({ name: 'email' })
  @Csrf()
  @Delete()
  DeleteAccount(@Query() query): Promise<Account[]> {
    return this.accountService.DeleteAccount(query.mail);
  }
}
