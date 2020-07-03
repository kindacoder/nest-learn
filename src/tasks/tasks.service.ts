import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { create } from 'domain';
import { Task } from './task.entity'
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository) {
    }

    // getAllTasks(): Task[] {
    //     return this.tasks;
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

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     //find the tasks
    //     const task = this.getTaskById(id)
    //     task.status = status;
    //     return task;

    // }

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

