import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { UserModel } from '../model/user';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUserSubject: BehaviorSubject<UserModel>;
  currentUser$: Observable<UserModel>;

  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  constructor(
    private authApiService: AuthApiService
  ) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(this.getUserFromLocalStorage());
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<UserModel> {
    return this.authApiService.login(email, password).pipe(
      map((user: UserModel) => {
        if (user) {
          this.setUserInLocalStorage(user);
          this.currentUserSubject.next(user);
        }
        return user;
      }),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      })
    );
  }

  register(email: string, password: string): Observable<UserModel> {
    return this.authApiService.register(email, password).pipe(
      map((user: UserModel) => {
        if (user) {
          this.setUserInLocalStorage(user);
          this.currentUserSubject.next(user);
        }
        return user;
      }),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      })
    );
  }
  
  private setUserInLocalStorage(user: UserModel): void {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }
  
  private getUserFromLocalStorage(): UserModel {
    const userLocal = localStorage.getItem('currentUser');
    if (userLocal) {
      return JSON.parse(userLocal);
    }
    return undefined;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(undefined);
  }
}
