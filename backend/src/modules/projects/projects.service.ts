import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.project.findMany();
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }

  async create(name: string, description?: string) {
    return this.prisma.project.create({
      data: { name, description },
    });
  }

  async update(id: string, name: string, description?: string) {
    return this.prisma.project.update({
      where: { id },
      data: { name, description },
    });
  }

  async remove(id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}