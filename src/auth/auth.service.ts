import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USERS_SERVICE')
        private readonly userService: UsersService,
        private jwtService: JwtService,
        private readonly mailService: MailerService
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
        const payload = { username: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
    }

    async forgetPassword(email: string) {
        const userDB = await this.userService.getUserByEmail(email);
        const message = `Forgot your password? If you didn't forget your password, please ignore this email!`;

        if(userDB) {
            this.mailService.sendMail({
                from: 'daiane teste <daiane@teste.com>',
                to:email,
                subject:'Esqueceu a senha?',
                text: message
            })
        }
    }
}
