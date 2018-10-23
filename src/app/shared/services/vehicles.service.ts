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

  vehicles: Vehicle[] = [];
  vehiclesSubject: Subject<Vehicle[]> = new Subject();

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  create(userId: string, vehicle: Vehicle): Observable<Vehicle | ApiErrors> {
    return this.http.post<Vehicle>(
      `${VehiclesService.API_USERS}/${userId}${VehiclesService.API_VEHICLES}`,
      vehicle,
      BaseApiService.defaultOptions
    ).pipe(
      map((vehicle: Vehicle) => {
        vehicle = Object.assign(new Vehicle(), vehicle);
        this.vehicles.push(vehicle);
        this.notifyVehiclesChanges();
        console.log('VH-->', vehicle);
        return vehicle;
      }),
      catchError(this.handleError)
    );
  }

  onVehiclesChanges(): Observable <Array<Vehicle>> {
    return this.vehiclesSubject.asObservable();
  }

  private notifyVehiclesChanges(): void {
    this.vehiclesSubject.next(this.vehicles);
  }

}
