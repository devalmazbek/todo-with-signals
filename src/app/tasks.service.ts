import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './tasks/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: {title: string; description: string}) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    }

    this.tasks.update((oldTask) => {
      return [...oldTask, newTask]
    })
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    this.tasks.update((oldTask) => oldTask.map((task) => {
      return task.id === id ? { ...task, status: status } : task
    }))
  }




}
