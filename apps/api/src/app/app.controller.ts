import { Controller, Get, Res } from '@nestjs/common';

import { Message } from '@nx-nest-postgre-manager/api-interfaces';

import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  edit(@Res() res: Response) {
      return res.render('index.html')
  }
}
