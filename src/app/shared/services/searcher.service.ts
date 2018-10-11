import { User } from './../models/user.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ApiErrors } from './../models/api-errors.model';
import { Commute } from './../models/commute.model';
import { BaseApiService } from './base-api.service';
import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearcherService extends BaseApiService {

  private static readonly API_SEARCH = `${BaseApiService.BASE_API}/commutes`;
  private static readonly CURRENT_USER_KEY = 'current-user';

  private commutes: Commute[] = [];

  private commute: Commute = new Commute();

  private commuteSubject: Subject<Array<Commute>> = new Subject();


  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    ) {
    super();
  }

  listAll(): Observable<Commute[] | ApiErrors> {
    return this.http.get<Commute[]>(SearcherService.API_SEARCH, BaseApiService.defaultOptions)
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
    const userData = localStorage.getItem(SearcherService.CURRENT_USER_KEY);
    const userID = JSON.parse(userData).id;

    return this.http.post<void>(`${SearcherService.API_SEARCH}/${commuteId}`, { id: userID }, BaseApiService.defaultOptions)
      .subscribe((data) => {
        console.log(data);
      });
  }

  onCommutesChanges(): Observable<Commute[]> {
    return this.commuteSubject.asObservable();
  }

  private notifyCommuteChanges(): void {
    this.commuteSubject.next(this.commutes);
  }
}
