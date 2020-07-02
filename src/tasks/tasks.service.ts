import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { create } from 'domain';
import { Task } from './task.entity'
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';

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





    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN

    //     }
    //     this.tasks.push(task)
    //     return task;
    // }

    // //update a task status

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     //find the tasks
    //     const task = this.getTaskById(id)
    //     task.status = status;
    //     return task;

    // }

    // //delete a task by id

    // deleteTask(id: string): void {
    //     //find the task first
    //     this.tasks = this.tasks.filter(task => task.id !== id)
    // }



}

