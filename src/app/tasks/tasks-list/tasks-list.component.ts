import { Component, signal, computed } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');
  constructor(private TaskService: TasksService) {}
  tasks = computed(() => {
    switch(this.selectedFilter()) {
      case "done":
        return this.TaskService.allTasks().filter((task) => task.status === 'DONE')
      case "open":
        return this.TaskService.allTasks().filter((task) => task.status === 'OPEN')
      case "in-progress":
        return this.TaskService.allTasks().filter((task) => task.status === 'IN_PROGRESS')
      default:
        return this.TaskService.allTasks();
    }
  })

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
