import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Status } from '../../database/entity/task/task.entity';
import { TaskDto } from '../dto/task.dto';
import { TaskService } from '../task/task.service';

@Controller('/api/task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @Get('list')
    async GetTasks() {
        return await this.taskService.GetAllTasks();
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

    @ApiQuery({ name: 'status' })
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
