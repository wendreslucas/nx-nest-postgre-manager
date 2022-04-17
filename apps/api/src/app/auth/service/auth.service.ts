import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../../user/dto/user.dto';
import { UserService } from '../../user/service/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
      ) {}

      async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findUser(username);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

      async login(user: UserDto) {
        const payload = { username: user.username };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
