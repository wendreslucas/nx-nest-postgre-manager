import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Status } from '@nx-nest-postgre-manager/api-interfaces';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { TaskDto } from '../dto/task.dto';
import { TaskService } from '../task/task.service';
import { Csrf } from "ncsrf";
import { CsrfService } from '../../service/csrf.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/task')
export class TaskController {
    constructor(
      private taskService: TaskService,
      private csrfService: CsrfService
    ) { }

    @Csrf()
    @Get('list')
    async GetTasks() {
        return await this.taskService.GetAllTasks();
    }

    @Get('csrf-token')
    GetCsrfToken(@Req() req): any {
      return this.csrfService.GetCsrfToken(req);
    }

    @ApiParam({ name: 'id'})
    @Get(':id')
    async GetTaskById(@Param('id') id) {
        return await this.taskService.GetTaskById(id);
    }

    @ApiParam({ name: 'id'})
    @Delete(':id')
    async Delete(@Param('id') id) {
        this.taskService.RemoveTaskById(id);
    }

    @ApiQuery({ name: 'status', enum: Status })
    @ApiParam({ name: 'id'})
    @Put(':id')
    async UpdateStatus(@Param('id') id, @Query() query) {
        const status = query.status;
        if (
          status &&
          Object.values(Status).findIndex((val) => val === status) !== -1
        ) {
          return await this.taskService.UpdateStatus(id, status);
        } else {
          throw new HttpException('Missing status', HttpStatus.BAD_REQUEST);
        }
    }

    @ApiBody({ type: TaskDto })
    @Post()
    async CreateNewTask(@Body() taskDto: TaskDto) {
        return this.taskService.AddTask(taskDto);
    }

}
