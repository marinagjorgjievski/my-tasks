import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { TaskModel } from '../model/task';
import { TASKS } from '../data/mock-tasks';
import { AuthService } from './auth.service';
import { UserModel } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private currentUserSub: Subscription;
  signedInUser: UserModel;

  constructor( private authService: AuthService) { 
    this.signedInUser = this.authService.currentUserValue;
    this.currentUserSub = this.authService.currentUser$.subscribe((user) => {
      this.signedInUser = user;
    });
  }

  ngOnInit(): void {
  }

  getTasks(): Observable<TaskModel[]> {
    const tasks = of(TASKS)
    return tasks;
  }

  getTasksByUser(userId: number): Observable<TaskModel[]> {
    const userTasks = TASKS.filter(task => task.userId === userId);
    return of(userTasks);
  }

  getTask(id: number): Observable<TaskModel> {
    const task = TASKS.find(tasks => tasks.id === id);
    return of(task);
  }

  addTask(newTask: TaskModel): Observable<TaskModel> {
    newTask.id = Math.floor(Math.random() * (1000000 - 0 + 1));
    newTask.userId = this.signedInUser.id;
    newTask.created = new Date();
    newTask.modified = new Date();
    TASKS.push(newTask);
    return new Observable((subscriber) => {
      setTimeout(() => {
          subscriber.next(newTask);
          subscriber.complete();
      }, 2000);
    });
  }

  updateTask(updateTask: TaskModel): Observable<TaskModel> {
    const taskIndex = TASKS.findIndex(task => task.id == updateTask.id);
    updateTask.modified = new Date();
		TASKS[taskIndex] = updateTask;
    return new Observable((subscriber) => {
      setTimeout(() => {
          subscriber.next(updateTask);
          subscriber.complete();
      }, 2000);
    });
  }

  deleteTask(id: number) {
    const taskIndex = TASKS.findIndex(task => task.id == id);
    TASKS.splice(taskIndex, 1);
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
  }
}
