import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  NodeJsLoginError,
  NodeJsLoginErrorDescriptions,
  NodeJsLoginErrors,
  NodeJsLoginResponse,
} from '../nodejs/nodejs.interface';
import { NodeJsService } from '../nodejs/nodejs.service';
import { StorageService } from '../storage/storage.service';
import { LoginErrorStatus, LoginResponse } from './authentication.interface';
import { map, catchError } from 'rxjs/operators';

/**
 * Take care of the user connection and disconnection
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _accessToken = new BehaviorSubject<string>(null);
  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private storage: StorageService,
    private nodejsApi: NodeJsService
  ) {}

  public observeIsLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  public isLoggedIn() {
    return this._isLoggedIn.getValue();
  }

  public getAccessToken(): string {
    return this._accessToken.getValue();
  }

  /**
   * Log the user et get info
   * @param email 
   * @param password 
   */
  login(email: string, password: string): Observable<LoginResponse> {
    // call nodejs api to validate the login
    return this.nodejsApi.login(email, password).pipe(
      map((response: NodeJsLoginResponse) => {
        // store the token
        this.storeAuthTokenFromNodeJsResponse(response);
        // load user info
        this._isLoggedIn.next(true);
        return { ok: true };
      }),
      catchError((err: NodeJsLoginError) => {
        console.log('error!', err);
        if (err.error && err.error.error === NodeJsLoginErrors.INVALID_GRANT) {
          if (
            err.error.error_description ===
            NodeJsLoginErrorDescriptions.WRONG_CREDENTIALS
          ) {
            return of({
              ok: false,
              errorStatus: LoginErrorStatus.WRONG_CREDENTIALS,
            });
          }
          if (
            err.error.error_description ===
            NodeJsLoginErrorDescriptions.ACCOUNT_DISABLED
          ) {
            return of({
              ok: false,
              errorStatus: LoginErrorStatus.ACCOUNT_DISABLED,
            });
          }
        }
        throw err;
      })
    );
  }

  private storeAuthTokenFromNodeJsResponse(
    response: NodeJsLoginResponse
  ): Observable<{ ok: boolean }> {
    this._accessToken.next(response.access_token);
    return this.storage.setAuthStorage({
      accessToken: response.access_token
    });
  }
}
