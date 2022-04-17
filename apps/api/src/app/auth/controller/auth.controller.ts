import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserDto } from '../../user/dto/user.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';

@Controller('/api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() req: UserDto) {
      return this.authService.login(req);
    }
}

