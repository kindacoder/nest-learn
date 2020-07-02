import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';

import { timeLog } from 'console';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity'

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }


    // //get all tasks
    // @Get()
    // getAllTasks(): Task[] {
    //     return this.tasksService.getAllTasks()
    // }

    //get a task by id

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    // //create a task

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    // //update a task
    // @Patch('/:id/status')
    // updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
    //     return this.tasksService.updateTaskStatus(id, status);
    // }

    // //delete a task by id

    // @Delete('/:id')
    // deleteTask(@Param('id') id: string): void {
    //     return this.tasksService.deleteTask(id)
    // }


}
