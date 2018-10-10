import { map, catchError } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ApiErrors } from './../models/api-errors.model';
import { Commute } from './../models/commute.model';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearcherService extends BaseApiService {

  private static readonly API_SEARCH = `${BaseApiService.BASE_API}/commutes`;

  private commutes: Commute[] = [];

  private commuteSubject: Subject<Array<Commute>> = new Subject();

  constructor(private http: HttpClient) {
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

  onCommutesChanges(): Observable<Commute[]> {
    return this.commuteSubject.asObservable();
  }

  private notifyCommuteChanges(): void {
    this.commuteSubject.next(this.commutes);
  }
}
