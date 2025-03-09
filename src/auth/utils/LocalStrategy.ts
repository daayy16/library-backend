import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "../auth.service";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject('AUTH_SERVICE') private readonly authservice: AuthService) {
        super({
            usernameField: 'email'
        });
    }

    async validate(email: string, password: string) {
        const user = await this.authservice.validateUser(email, password);
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}