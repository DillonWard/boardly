import { Controller, Post, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    login(@Body('email') email: string, @Body('password') password: string){
        return this.authService.signIn(email, password)
    }

}
