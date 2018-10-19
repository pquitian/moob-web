import { FilterCriteria } from './../models/filter-criteria.model';
import { User } from '../models/user.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ApiErrors } from '../models/api-errors.model';
import { Commute } from '../models/commute.model';
import { BaseApiService } from './base-api.service';
import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommutesService extends BaseApiService {

  private static readonly API_SEARCH = `${BaseApiService.BASE_API}/commutes`;
  private static readonly CURRENT_USER_KEY = 'current-user';
  private static readonly FILTER_ROUTE = 'filter';
  private readonly HEADERS =  new HttpHeaders().set('Content-Type', 'application/json');

  private commutes: Commute[] = [];
  private commute: Commute = new Commute();
  private commuteSubject: Subject<Array<Commute>> = new Subject();

  userId: any = this.sessionService.user.id;


  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    super();
  }

  listAll(): Observable<Commute[] | ApiErrors> {
    return this.http.get<Commute[]>(CommutesService.API_SEARCH, BaseApiService.defaultOptions)
      .pipe(
        map((commutes: Commute[]) => {
          commutes = commutes.map(commute => Object.assign(new Commute(), commute));
          this.commutes = commutes;
          this.notifyCommuteChanges();
          return commutes;
        }),
        catchError(this.handleError)
      );
  }

  addPassenger(commuteId: string) {
    return this.http.post<Commute>(`${CommutesService.API_SEARCH}/${commuteId}`, null, BaseApiService.defaultOptions)
      .subscribe((data) => {
        console.log(data);
        data.passengers.push(this.userId);
        // this.commutes.passengers.push(data);
        this.notifyCommuteChanges();
        return data;
      });
  }

  // addPassenger(commuteId: string): Observable<Commute | ApiErrors> {
  //   return this.http.post<User>(`${CommutesService.API_SEARCH}/${commuteId}`, commuteId, BaseApiService.defaultOptions)
  //     .pipe(
  //       map((commute: Commute) => {
  //         this.commutes.push(commute);
  //         this.notifyCommuteChanges();
  //         return commute;
  //       },
  //         catchError(this.handleError)
  //       )
  //     );
  // }

  createCommute(commute: Commute): Observable <Commute | ApiErrors> {
    return this.http.post<Commute>(CommutesService.API_SEARCH, commute,  BaseApiService.defaultOptions)
      .pipe(
        map((commute: Commute) => {
          commute = Object.assign(new Commute(), commute);
          this.commutes.push(commute);
          this.notifyCommuteChanges();
          return commute;
        })
      );
  }

  filter(criteria: FilterCriteria): Observable <Commute[] | ApiErrors>  {
    let httpParams = new HttpParams();
      Object.keys(criteria).forEach(function (key) {
      httpParams = httpParams.append(key, criteria[key]);
    });
    return this.http.get<FilterCriteria>(`${CommutesService.API_SEARCH}/${CommutesService.FILTER_ROUTE}`,
    { headers: this.HEADERS, params: httpParams, withCredentials: true })
      .pipe(
        map((commutes: Commute[]) => {
          commutes = commutes.map(commute => Object.assign(new Commute(), commute));
          this.commutes = commutes;
          this.notifyCommuteChanges();
          return commutes;
        }),
        catchError(this.handleError)
      );
  }

  getOne(commuteId: string): Observable <Commute | ApiErrors>{
    return this.http.get<Commute>(`${CommutesService.API_SEARCH}/${commuteId}`, BaseApiService.defaultOptions)
      .pipe(
        map((commute: Commute) => Object.assign(new Commute(), commute)),
        catchError(this.handleError));
  }


  onCommutesChanges(): Observable<Commute[]> {
    return this.commuteSubject.asObservable();
  }

  private notifyCommuteChanges(): void {
    this.commuteSubject.next(this.commutes);
  }
}
