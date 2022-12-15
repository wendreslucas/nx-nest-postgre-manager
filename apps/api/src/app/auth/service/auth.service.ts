import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Response as ResponseType } from 'express';
import { UserService } from '../../user/service/user.service';
import { UpdateUserDto } from '../../user/dto/updateUser.dto';
import { AuthDto } from '../dto/auth.dto';
import { AuthTokenDto } from '../dto/authToken.dto';
import { Role } from '../../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (user && pass === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: AuthDto): Promise<AuthTokenDto> {
    const foundUser = await this.usersService.findUser(user.username);
    if (foundUser) {
      const tokens = await this.getTokens(user.username, foundUser.role);
      await this.updateRefreshToken(user.username, tokens.refreshToken);
      return tokens;
    }
    return {
      accessToken: null,
      refreshToken: null
    }
  }

  async logout(username: string) {
    await this.usersService.findAndUpdateUser(username, Object.assign(new UpdateUserDto(), { refreshToken: null }));
  }

  async refreshAccessToken(username: string, refreshToken: string): Promise<AuthTokenDto> {
    const user = await this.usersService.findUser(username);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    
    //const refreshTokenMatches = user.refreshToken === refreshToken;
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.username, user.role);
    await this.updateRefreshToken(user.username, tokens.refreshToken);
    return tokens;
  }

  async getTokens(username: string, role: Role): Promise<AuthTokenDto> {
    const tokens = await Promise.all(
      [
        this.jwtService.signAsync(
          {
            username,
            role
          },
         {
           secret: this.configService.get<string>('secret'),
           expiresIn: '15m',
         }
       ), 
       this.jwtService.signAsync(
         {
          username ,
          role
         },
         {
           secret: this.configService.get<string>('refresh_secret'),
           expiresIn: '7d',
         }
        )
       ],
    );

    return {
      accessToken: tokens[0],
      refreshToken: tokens[1]
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.usersService.findAndUpdateUser(userId, Object.assign(new UpdateUserDto(), {
      refreshToken: hashedRefreshToken
    }));
  }

  storeTokenInCookie(res: ResponseType, authToken: AuthTokenDto) {
    res.cookie('access_token', authToken.accessToken, { maxAge: 1000 * 60 * 15, httpOnly: true });
    res.cookie('refresh_token', authToken.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true });
  }

}
