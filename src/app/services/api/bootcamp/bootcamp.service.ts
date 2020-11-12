import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Bootcamp } from 'src/app/pages/bootcamps/bootcamp.interface';
import { getConfig } from 'src/environments/environment';

import { catchError } from 'rxjs/operators';
import { HTTP_VERB } from '../api.interface';

const nodeJsUrl = getConfig('apiUrl');

type HttpOptions = {
  headers?: HttpHeaders;
  params?: HttpParams;
};

@Injectable({
  providedIn: 'root',
})
export class BootcampService {
  bootcamp: Bootcamp;
  readonly options: HttpOptions;

  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders(),
      params: new HttpParams(),
    };
  }

  /**
   * GET all bootcamps
   * @param bootcamp
   */
  getBootcamps(): Observable<Bootcamp> {
    const path = 'bootcamps';

    return this.sendRequest('GET', path).pipe(
      catchError((response) => {
        if (response.error && response.error.libelleMessage) {
          return of(response.error);
        }
        return of({
          success: false,
          codeMessage: response.statusText,
          libelleMessage: response.error,
          body: null,
        });
      })
    );
  }

  /**
   * GET only bootcamps by selected values
   * @param select
   * @param requestHttpOptions
   */
  getBootcampsSelect(
    select: string,
    requestHttpOptions?: HttpOptions
  ): Observable<Bootcamp> {
    const path = `bootcamps?select=${select}`;
    const options: HttpOptions = { ...requestHttpOptions };
    const body = new HttpParams().set(`select`, select);

    return this.sendRequest('GET', path, options, body).pipe(
      catchError((response) => {
        if (response.error && response.error.libelleMessage) {
          return of(response.error);
        }
        return of({
          success: false,
          codeMessage: response.statusText,
          libelleMessage: response.error,
          body: null,
        });
      })
    );
  }

  /**
   * GET only bootcamps sorted values
   * @param sort
   * @param requestHttpOptions
   */
  getBootcampsSorted(
    sort: string,
    requestHttpOptions?: HttpOptions
  ): Observable<Bootcamp> {
    const path = `bootcamps?sort=${sort}`;
    const options: HttpOptions = { ...requestHttpOptions };
    const body = new HttpParams().set(`sort`, sort);

    return this.sendRequest('GET', path, options, body).pipe(
      catchError((response) => {
        if (response.error && response.error.libelleMessage) {
          return of(response.error);
        }
        return of({
          success: false,
          codeMessage: response.statusText,
          libelleMessage: response.error,
          body: null,
        });
      })
    );
  }

  /**
   * GET number bootcamps per pages
   * @param filter
   * @param requestHttpOptions
   */
  getBootcampsByPage(
    filter: string,
    requestHttpOptions?: HttpOptions
  ): Observable<Bootcamp> {
    const path = `bootcamps?limit=${filter}`;
    const options: HttpOptions = { ...requestHttpOptions };
    const body = new HttpParams().set(`filter`, filter);

    return this.sendRequest('GET', path, options, body).pipe(
      catchError((response) => {
        if (response.error && response.error.libelleMessage) {
          return of(response.error);
        }
        return of({
          success: false,
          codeMessage: response.statusText,
          libelleMessage: response.error,
          body: null,
        });
      })
    );
  }

  /**
   * Navigate beetween pages
   * @param page
   * @param requestHttpOptions
   */
  getBootcampsNextPrevPage(
    limit: string,
    page: string,
    requestHttpOptions?: HttpOptions
  ): Observable<Bootcamp> {
    const path = `bootcamps?limit=${limit}&page=${page}`;
    const options: HttpOptions = { ...requestHttpOptions };
    const body = new HttpParams().set(`page`, page).set(`limit`, limit);

    return this.sendRequest('GET', path, options, body).pipe(
      catchError((response) => {
        if (response.error && response.error.libelleMessage) {
          return of(response.error);
        }
        return of({
          success: false,
          codeMessage: response.statusText,
          libelleMessage: response.error,
          body: null,
        });
      })
    );
  }

  /**
   * GET a bootcamp with radius
   * @param zipcode
   * @param distance
   * @param requestHttpOptions
   */
  getBootcampInRadius(
    zipcode: string,
    distance: string,
    requestHttpOptions?: HttpOptions
  ): Observable<Bootcamp> {
    const path = `bootcamps/radius/${zipcode}/${distance}`;
    const options: HttpOptions = { ...requestHttpOptions };
    const body = new HttpParams()
      .set(`zipcode`, zipcode)
      .set(`distance`, distance);

    return this.sendRequest('GET', path, options, body).pipe(
      catchError((response) => {
        if (response.error && response.error.libelleMessage) {
          return of(response.error);
        }
        return of({
          success: false,
          codeMessage: response.statusText,
          libelleMessage: response.error,
          body: null,
        });
      })
    );
  }

  /**
   * Create a new Bootcamp
   * @param requestHttpOptions
   * @param bootcamp
   */
  createBootcamp(bootcamp: Bootcamp): Observable<Bootcamp> {
    const path = 'bootcamp/create';
    const body = bootcamp;
    const options: HttpOptions = { ...this.options };

    return this.sendRequest('POST', path, options, body).pipe(
      catchError((response) => {
        if (response.error && response.error.libelleMessage) {
          return of(response.error);
        }
        return of({
          success: false,
          codeMessage: response.statusText,
          libelleMessage: response.error,
          body: null,
        });
      })
    );
  }

  /**
   * @param method
   * @param path
   * @param options
   * @param body
   */
  private sendRequest<T>(
    method: HTTP_VERB,
    path: String,
    options?: HttpOptions,
    body?: any
  ): Observable<T> {
    const url = `${nodeJsUrl}${path}`;
    switch (method) {
      case 'DELETE':
        return this.http.delete<T>(url, options);
      case 'GET':
        return this.http.get<T>(url, options);
      case 'HEAD':
        return this.http.head<T>(url, options);
      case 'OPTIONS':
        return this.http.options<T>(url, options);
      case 'PATCH':
        return this.http.patch<T>(url, body, options);
      case 'POST':
        return this.http.post<T>(url, body, options);
      case 'PUT':
        return this.http.put<T>(url, body, options);
      default:
        console.error(`Unsupported request: ${method}`);
        return throwError(`Unsupported request: ${method}`);
    }
  }
}
