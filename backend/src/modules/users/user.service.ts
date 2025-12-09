import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async findAll(){
        return this.prisma.user.findMany({
            omit: {
                password: true
            }
        })
    }

    async findOne(id: string){
        return this.prisma.user.findUnique({
            where: { id }
        })
    }

    async findOneByEmail(email: string){
        return this.prisma.user.findUnique({
            where:{ email }
        })
    }

    async create(firstName: string, lastName: string, email: string, password: string, role: string){

        const hashedPassword = await argon.hash(password);
        return this.prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role
            }
        })
    }

    async update(id: string, firstName: string, lastName: string){
        return this.prisma.user.update({
            where: { id },
            data: { firstName, lastName }
        })
    }

    async remove(id: string){
        return this.prisma.project.delete({
            where: { id }
        })
    }
}