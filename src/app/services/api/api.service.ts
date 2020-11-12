import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { getConfig } from 'src/environments/environment';
import { ApiResponseInterface, HttpOptions, HTTP_VERB } from './api.interface';
import { catchError } from 'rxjs/operators';

const apiUrl = getConfig('apiUrl');

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * Send a request to API
   * @param method
   * @param path
   * @param body
   */
  sendRequest(
    method: HTTP_VERB,
    path: String,
    body?: any
  ): Observable<ApiResponseInterface> {
    return this.send(method, path, body);
  }

  /**
   * Check the request to the API
   * @param method
   * @param path
   * @param body
   */
  send(
    method: HTTP_VERB,
    path: String,
    body?: any
  ): Observable<ApiResponseInterface> {
    return this.callApi(method, path, body).pipe(
      catchError((response) => {
        if (response.error && response.error.libelleMessage) {
          return of(response.error);
        }
        return of({
          success: false,
          codeMessage: response.statusText,
          libelleMessage: response.message,
          body: null,
        });
      })
    );
  }

  /**
   * Request to the API Gateway
   * @param method
   * @param path
   * @param body
   */
  private callApi(
    method: HTTP_VERB,
    path: String,
    body?: any
  ): Observable<ApiResponseInterface> {
    const url = `${apiUrl}${path}`;

    const options: HttpOptions = {};

    switch (method) {
      case 'HEAD':
        return this.http.head<ApiResponseInterface>(url, options);
      case 'GET':
        return this.http.get<ApiResponseInterface>(url, options);
      case 'POST':
        return this.http.post<ApiResponseInterface>(url, body, options);
      case 'PUT':
        return this.http.put<ApiResponseInterface>(url, body, options);
      case 'PATCH':
        return this.http.patch<ApiResponseInterface>(url, body, options);
      case 'DELETE':
        return this.http.delete<ApiResponseInterface>(url, options);
      case 'OPTIONS':
        return this.http.options<ApiResponseInterface>(url, options);
      default:
        console.error(`Unsupported request: ${method}`);
        return throwError(`Unsupported request: ${method}`);
    }
  }
}
