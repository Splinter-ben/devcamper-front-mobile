import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ACCESS_TOKEN, AuthStorage } from './storage.interface';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  /**
   * Store token into storage
   */
  setAuthStorage(data: AuthStorage): Observable<{ ok: boolean }> {
    return from(this.storage.set(ACCESS_TOKEN, data.accessToken)).pipe(
      map(() => ({ ok: true })),
      catchError(() => of({ ok: false }))
    );
  }

  /**
   * Get token from storage
   * @param data
   */
  getAuthStorage(): Observable<AuthStorage> {
    return from(this.storage.get(ACCESS_TOKEN)).pipe(
      map((res) => {
        return { accessToken: res[0] };
      })
    );
  }

  /**
   * Remove the token from storage
   */
  removeAuthStorage(): Observable<{ ok: boolean }> {
    return from(this.storage.remove(ACCESS_TOKEN)).pipe(
      map(() => ({ ok: true })),
      catchError(() => of({ ok: false }))
    );
  }
}
