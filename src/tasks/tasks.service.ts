import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model'
import { v1 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { create } from 'domain';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    getAllTasks(): Task[] {
        return this.tasks;
    }



    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id)
    }




    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN

        }
        this.tasks.push(task)
        return task;
    }

    //update a task status

    updateTaskStatus(id: string, status: TaskStatus): Task {
        //find the tasks
        const task = this.getTaskById(id)
        task.status = status;
        return task;

    }

    //delete a task by id

    deleteTask(id: string): void {
        //find the task first
        this.tasks = this.tasks.filter(task => task.id !== id)
    }



}

