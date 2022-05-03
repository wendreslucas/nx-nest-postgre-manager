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

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('secret'),
                signOptions: { expiresIn: '60s' },
            }),
            inject: [ConfigService]
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
