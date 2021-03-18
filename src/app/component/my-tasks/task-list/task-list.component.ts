import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { TaskModel } from '../../../model/task';
import { TaskService } from '../../../service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
  private currentUserSub: Subscription;
  tasks: TaskModel[] = [];
  signedInUser: UserModel;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.signedInUser = this.authService.currentUserValue;
    this.currentUserSub = this.authService.currentUser$.subscribe((user) => {
      this.signedInUser = user;
    });
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasksByUser(this.signedInUser.id)
      .subscribe(tasks => this.tasks = tasks);
  }

  delete(event: MouseEvent, id: number): void {
    event.preventDefault();
    this.taskService.deleteTask(id);
    const taskIndex = this.tasks.findIndex(task => task.id == id);
    this.tasks.splice(taskIndex, 1);
  }
  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }
}
