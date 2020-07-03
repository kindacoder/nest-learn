import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';

import { timeLog } from 'console';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity'
import { TaskStatus } from './task-status.enum';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }


    //get all tasks
    @Get()
    getAllTasks(): Promise<Task[]> {
        return this.tasksService.getAllTasks()
    }

    //get a task by id

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    // //create a task

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    //update a task
    @Patch('/:id/status')
    updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }

    // //delete a task by id

    @Delete('/:id')
    @HttpCode(204)
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.deleteTask(id)
    }


}
