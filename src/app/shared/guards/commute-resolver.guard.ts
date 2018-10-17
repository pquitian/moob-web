import { catchError } from 'rxjs/operators';
import { CommutesService } from './../services/commutes.service';
import { ApiErrors } from './../models/api-errors.model';
import { Commute } from './../models/commute.model';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommuteResolverGuard implements Resolve<Commute | ApiErrors> {

  constructor(
    private commuteService: CommutesService,
    private router: Router
  ) {}

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Commute | ApiErrors> {
    return this.commuteService.getOne(next.params.commuteId)
      .pipe(
        catchError((error: ApiErrors) => {
          this.router.navigate(['/search']);
          return throwError(error);
        })
      );
  }
}
