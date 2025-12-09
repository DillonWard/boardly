import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  getProject(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Post()
  createProject(@Body('name') name: string) {
    return this.projectsService.create(name);
  }
}
