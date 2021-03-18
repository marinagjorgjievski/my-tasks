import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  users: UserModel[];

  constructor(
  ) {
    this.users = [];
  }
  
  login(email: string, password: string): Observable<UserModel> {
    const user = this.users.find(userItem => {
      return userItem.email === email && userItem.password === password;
    });

    return new Observable((subscriber) => {
      setTimeout(() => {
          subscriber.next(user);
          subscriber.complete();
      }, 2000);
    });
  }
  
  register(email: string, password: string): Observable<UserModel> {
    const user = new UserModel(this.users.length, email, password, new Date());

    this.users.push(user);

    return new Observable((subscriber) => {
      setTimeout(() => {
          subscriber.next(user);
          subscriber.complete();
      }, 2000);
    });
  }
}
