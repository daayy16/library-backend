import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USERS_SERVICE')
        private readonly userService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string) {
        const userDB = await this.userService.getUserByEmail(email);
        if(userDB){
            const matched = comparePassword(password, userDB.password)
            if(matched) {
                return userDB;
            } else {
                return null
            }
        }
        return null
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
