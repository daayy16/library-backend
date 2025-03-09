import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './controller/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './utils/LocalStrategy';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/auth.constants';
import { JwtStrategy } from './utils/JwtStrategy';

@Module({
  imports: [TypeOrmModule.forFeature(entities), PassportModule, 
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
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
  controllers: [AuthController]
})
export class AuthModule { }
