import { Controller, Get, Res } from '@nestjs/common';

import { Message } from '@nx-nest-postgre-manager/api-interfaces';

import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get()
  edit(@Res() res: Response) {
      return res.render('index.html')
  }
}
