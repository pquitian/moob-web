import { BaseApiService } from './base-api.service';
import { User } from './../models/user.model';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService {

  private static readonly USER_API = `${BaseApiService.BASE_API}/users`;

  constructor(private http: HttpClient) {
    super();
  }

  create(user: User) {
    return this.http.post<User>(UserService.USER_API, user, BaseApiService.defaultOptions)
      .pipe(
        map((user: User) => Object.assign(new User(), user)),
        catchError(this.handleError)
      );
  }

}
