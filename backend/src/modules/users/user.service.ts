import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    async findAll(){
        return this.prisma.user.findMany()
    }

    async findOne(id: string){
        return this.prisma.user.findUnique({
            where: { id }
        })
    }

    async create(firstName: string, lastName: string, email: string){
        return this.prisma.user.create({
            data: {
                firstName,
                lastName,
                email
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