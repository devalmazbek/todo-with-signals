import { Injectable, signal, effect } from '@angular/core';
import { Task, TaskStatus } from './tasks/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks = signal<Task[]>(this.loadFromStorage());

  allTasks = this.tasks.asReadonly();

  constructor() {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem('task', JSON.stringify(tasks));
    });
  }

  private loadFromStorage(): Task[] {
    const raw = localStorage.getItem('task');
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

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

  deleteTask(id: string) {
    this.tasks.update((oldTask) => oldTask.filter((task) => task.id !== id));
  }

  updateTaskItem(id: string, title:string, description: string) {
    this.tasks.update((oldTask) => oldTask.map((task) => task.id === id ? {...task, title: title, description: description} : task ))
  }




}
