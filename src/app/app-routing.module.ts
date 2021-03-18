import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './component/my-tasks/task-list/task-list.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { TaskFormComponent } from './component/my-tasks/task-form/task-form.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'my-tasks', component: TaskListComponent, 
    children: [
      { path: '', component: TaskListComponent },
    ]
  },
  { path: 'new', component: TaskFormComponent },
  { path: 'detail/:id', component: TaskFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
