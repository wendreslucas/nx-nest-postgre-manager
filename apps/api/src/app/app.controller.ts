import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get('account/')
  @Get('account/list')
  edit(@Res() res: Response) {
      return res.render('account/index.html')
  }
  @Get('dashboard/')
  dashboard(@Res() res: Response) {
      return res.render('dashboard/index.html')
  }
}
