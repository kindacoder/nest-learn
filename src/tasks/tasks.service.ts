import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { create } from 'domain';
import { Task } from './task.entity'
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository) {
    }

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return await this.taskRepository.getTasks(filterDto)

    }

    // async getAllTasks(): Promise<Task[]> {
    //     const result = await this.taskRepository.find();
    //     return result;
    // }

    // async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    //     const { status, search } = filterDto;
    //     let tasks = await this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status == status);
    //     }
    //     if (search) {
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.description.includes(search)
    //         )

    //     }

    //     return tasks;
    // }






    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with id "${id}" not found. `)
        }
        return found;

    }





    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto)
    }

    // //update a task status

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {

        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }

    //delete a task by id

    async deleteTask(id: number): Promise<Task> {
        const result = await this.taskRepository.delete(id);
        if (result.affected == 0) {
            throw new NotFoundException(`Task with id "${id}" not found and can't be deleted.. `)
        }
        else {
            return;
        }

    }



}

