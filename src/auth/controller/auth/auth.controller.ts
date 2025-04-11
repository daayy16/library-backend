import { Controller, Request, Post, UseGuards, Inject, Get, Body, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) {
    }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }


    @Post('forgot-password')
    async forgetPassword(@Res() response, @Body() body) {
        const mail = await this.authService.forgetPassword(body.email);
        
        return response.status(200).json({
            message: 'email enviado',
            mail
        })
    }
}
