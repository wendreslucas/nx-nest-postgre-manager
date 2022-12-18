import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { 
  Request as RequestType,
  Response as ResponseType
 } from 'express';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { Csrf } from 'ncsrf';
import { AuthDto } from '../dto/auth.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RefreshAuthGuard } from '../guard/refresh-auth.guard';
import { ApiQuery } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AuthTokenDto } from '../dto/authToken.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() req: AuthDto, 
    @Res({ passthrough: true }) res: ResponseType
  ) {
    const authToken = await this.authService.login(req);
    this.authService.storeTokenInCookie(res, authToken);
    return authToken;
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  @ApiQuery({ name: 'username' })
  async logout(
    @Query() query, 
    @Res({ passthrough: true }) res: ResponseType
  ) {
    await this.authService.logout(query.username);
    this.authService.storeTokenInCookie(res, {
      accessToken: null,
      refreshToken: null
    });
    res.status(200).send({message: 'ok'});
    return;
  }

  @UseGuards(RefreshAuthGuard)
  @Get('refresh')
  @ApiQuery({ name: 'username' })
  async refreshTokens(
    @Query() query, 
    @Req() req: RequestType, 
    @Res({ passthrough: true }) res: ResponseType
  ) {
    const refreshToken = req.cookies.refresh_token;
    const newAuthToken = await this.authService.refreshAccessToken(query.username, refreshToken);
    this.authService.storeTokenInCookie(res, newAuthToken);
    res.status(200).send({message: 'ok'});
    return;
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


