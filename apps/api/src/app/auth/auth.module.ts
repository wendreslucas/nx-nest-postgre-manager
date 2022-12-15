import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './service/auth.service';

import { AuthController } from './controller/auth.controller';
import { UserService } from '../user/service/user.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { async } from 'rxjs';
import { RefreshTokenStrategy } from './strategy/refreshToken.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy
  ]
})

export class AuthModule {}
