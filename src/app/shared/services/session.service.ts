import { HttpClient } from '@angular/common/http';
import { ApiErrors } from './../models/api-errors.model';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseApiService {

  private static readonly API_SESSION = `${BaseApiService.BASE_API}/sessions`;
  private static readonly CURRENT_USER_KEY = 'current-user';

  user: User;
  userSubject: Subject<User> = new Subject();

  constructor(private http: HttpClient) {
    super();
    const userData = localStorage.getItem(SessionService.CURRENT_USER_KEY);
    // console.log(JSON.parse(userData).id);
    if (userData) {
      this.user = Object.assign(new User(), JSON.parse(userData));
    }
    this.notifyUserChanges();
  }

  authenticate(user: User): Observable<User | ApiErrors> {
    return this.http.post<User>(SessionService.API_SESSION, user, BaseApiService.defaultOptions)
      .pipe(
        map((user: User) => {
          this.doAuthenticate(user);
          return user;
        }),
        catchError(this.handleError)
      );
  }

  getLocalStorageId(): string {
    const userData = localStorage.getItem(SessionService.CURRENT_USER_KEY);
    const userID = JSON.parse(userData).id;
    return userID;
  }

  onUserChanges(): Observable<User> {
    return this.userSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return this.user ? true : false;
  }

  private notifyUserChanges(): void {
    this.userSubject.next(this.user);
  }

  private doAuthenticate(user: User): void {
    this.user = user;
    localStorage.setItem(SessionService.CURRENT_USER_KEY, JSON.stringify(this.user));
    this.notifyUserChanges();
  }
  //TODO: logout()


}
