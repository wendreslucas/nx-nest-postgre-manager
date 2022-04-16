import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';

@Controller('/api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
}

