import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './controller/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/LocalStrategy';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/JwtStrategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature(entities), PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN')
        }
      }),
    })

  ],
  providers: [{
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  },
  {
    provide: 'USERS_SERVICE',
    useClass: UsersService
  },
    LocalStrategy,
    JwtStrategy ],
  controllers: [AuthController],
  exports:[JwtModule]
})
export class AuthModule { }
