import { map, catchError } from 'rxjs/operators';
import { User } from './../models/user.model';
import { ApiErrors } from './../models/api-errors.model';
import { Observable, Subject } from 'rxjs';
import { Vehicle } from './../models/vehicle.model';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService extends BaseApiService {

  private static readonly API_USERS = `${BaseApiService.BASE_API}/users`;
  private static readonly API_VEHICLES = '/vehicles';

  user: User = new User();
  userSubject: Subject<User> = new Subject();

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  create(userId: string, vehicle: Vehicle): Observable<User | ApiErrors> {
    return this.http.post<Vehicle>(
      `${VehiclesService.API_USERS}/${userId}${VehiclesService.API_VEHICLES}`,
      vehicle,
      BaseApiService.defaultOptions
    ).pipe(
      map((user: User) => {
        user = Object.assign(new User(), user);
        this.user = user;
        this.notifyUserChanges();

        return user;
      }),
      catchError(this.handleError)
    );
  }

  onUserChanges(): Observable <User> {
    return this.userSubject.asObservable();
  }

  private notifyUserChanges(): void {
    this.userSubject.next(this.user);
  }

}
