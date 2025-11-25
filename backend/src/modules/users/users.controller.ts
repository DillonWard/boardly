import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers(){
        return this.usersService.findAll()
    }

    @Get(':id')
    getUser(@Param('id') id: string){
        return this.usersService.findOne(id)
    }

    @Post()
    createUser(@Body('firstName') firstName: string, @Body('lastName') lastName: string, @Body('email') email: string) {
        return this.usersService.create(firstName, lastName, email)
    }
}