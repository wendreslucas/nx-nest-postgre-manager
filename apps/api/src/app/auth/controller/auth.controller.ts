import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { UserDto } from '../../user/dto/user.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { Csrf } from "ncsrf";

@Controller('/api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() req: UserDto) {
      return await this.authService.login(req);
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


