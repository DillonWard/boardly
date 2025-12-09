import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService){}

    async signIn(email: string, password: string): Promise<{access_token: string, user: Partial<User>}>{
        const user = await this.userService.findOneByEmail(email)
        if(!user) throw new UnauthorizedException("Invalid credentials")

        const isPasswordValid = await argon2.verify(user.password, password)
        if(!isPasswordValid) throw new UnauthorizedException("Invalid Password")

        const { password: _, ...userWithoutPassword } = user
        const payload = { sub: user.id, email: user.email, role: user.role }
        const access_token = await this.jwtService.signAsync(payload)
        return {
            access_token,
            user: userWithoutPassword
        }
    }
}
