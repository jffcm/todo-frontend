import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: { descricao: string, prioridade: string } = { descricao: '', prioridade: 'Alta' };

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((response: any) => {
      this.tasks = response.data;
    });
  }

  completeTask(taskId: number): void {
    this.taskService.completeTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  addTask(): void {
    if (!this.newTask.descricao) {
      alert('O nome da tarefa é obrigatório');
      return;
    }
    this.taskService.addTask(this.newTask).subscribe(() => {
      this.loadTasks();
      this.newTask = { descricao: '', prioridade: 'Alta' }; 
    });
  }
}
