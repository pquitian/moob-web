import { ApiErrors } from './../models/api-errors.model';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class BaseApiService {
  protected static readonly BASE_API = environment.baseApi;
  protected static readonly defaultOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    withCredentials: true
  };

  protected handleError(error: HttpErrorResponse): Observable<ApiErrors> {
    console.error('An error occurred:', error);
    const apiError = new ApiErrors();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Client error:', error.error.message);
      apiError.message = 'Something bad happened; please try again later.';
      apiError.status = 500;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
      apiError.message = error.error.message;
      apiError.errors = error.error.errors;
      apiError.status = error.status;
    }
    return throwError(apiError);
  }

}
