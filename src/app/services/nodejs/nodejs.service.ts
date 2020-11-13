import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { getConfig } from 'src/environments/environment';
import {
  NodeJsLoginResponse,
  NodeJsLogoutResponse,
  NodeJsUserInfoResponse,
} from './nodejs.interface';

const nodeJsUrl = getConfig('apiUrl');

type HttpOptions = {
  headers?: HttpHeaders;
  params?: HttpParams;
  reportProgress?: boolean;
  withCredentials?: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class NodeJsService {
  readonly options: HttpOptions;

  constructor(private readonly http: HttpClient) {
    this.options = {
      headers: new HttpHeaders(),
      params: new HttpParams(),
    };
  }

  /**
   * Log the user through nodejs to retrieve a valid token
   * @param user
   * @param password
   * @param requestHttpOptions
   */
  public login(
    email: string,
    password: string,
    requestHttpOptions?: HttpOptions
  ): Observable<NodeJsLoginResponse> {
    const path = `auth/login`;
    const options: HttpOptions = { ...this.options, ...requestHttpOptions };
    const body = { email, password };
    console.log(body);
    return this.sendRequest('POST', path, options, body);
  }

  /**
   * Get user's information (name, email, etc) from an access_token
   * @param accessToken
   */
  public getUserInfoFromToken(
    accessToken: string
  ): Observable<NodeJsUserInfoResponse> {
    const path = `auth/me`;

    const options: HttpOptions = {
      ...this.options,
      headers: this.options.headers.append(
        'Authorization',
        `Bearer ${accessToken}`
      ),
    };
    return this.sendRequest('GET', path, options);
  }

  /**
   * Logout user from NodeJs
   * @param accessToken
   */
  public logout(accessToken: string): Observable<NodeJsLogoutResponse> {
    const path = `logout`;

    const options: HttpOptions = {
      ...this.options,
      headers: this.options.headers.append(
        'Authorization',
        `Bearer ${accessToken}`
      ),
    };
    return this.sendRequest('POST', path, options);
  }

  private sendRequest<T>(
    method: string,
    path: string,
    options: HttpOptions,
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
