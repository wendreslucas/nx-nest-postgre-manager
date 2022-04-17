import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './service/auth.service';

import { AuthController } from './controller/auth.controller';
import { UserService } from '../user/service/user.service';
import { jwtConstants } from './strategy/constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
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
        JwtStrategy
    ]
})

export class AuthModule {}
