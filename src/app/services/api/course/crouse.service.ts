import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { Course } from 'src/app/pages/courses/course.interface';
import { getConfig } from 'src/environments/environment';
import { HttpOptions, HTTP_VERB } from '../api.interface';

const nodeJsUrl = getConfig('apiUrl');

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  course: Course;
  readonly options: HttpOptions;

  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders(),
      params: new HttpParams(),
    };
  }

  getCourseById(bootcampId: string): Observable<Course> {
    return;
  }

  /**
   * GET all courses
   */
  getCourses(): Observable<Course> {
    const path = `courses`;

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
   *
   * @param method
   * @param path
   * @param options
   * @param body
   */
  private sendRequest<T>(
    method: HTTP_VERB,
    path: string,
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
