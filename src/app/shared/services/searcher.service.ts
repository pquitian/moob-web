import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) {
    super();
  }

  listAll(): Observable<Commute[] | ApiErrors> {
    return this.http.get<Commute[]>(SearcherService.API_SEARCH, BaseApiService.defaultOptions)
      .pipe(
        map((commute: Commute) => {
          return commute;
        }),
        catchError(this.handleError)
      );
  }
}
