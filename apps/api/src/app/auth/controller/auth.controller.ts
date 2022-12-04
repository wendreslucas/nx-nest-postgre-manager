import { Body, Controller, Get, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { UserDto } from '../../user/dto/user.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { Csrf } from "ncsrf";
import { Response as ResponseType } from 'express';

@Controller('/api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
      @Body() req: UserDto, 
      @Res({ passthrough: true }) res: ResponseType
    ) {
      const token = await this.authService.login(req);
      res.cookie('access_token', token.access_token);
      return token
    }

    @Get('csrf')
    getCsrfToken(@Req() req): any {
      return {
        token: req.csrfToken()
      }
    }

    @Post('csrftest')
    @Csrf()
    needProtect(): string{
      return "Protected!";
    }
}


