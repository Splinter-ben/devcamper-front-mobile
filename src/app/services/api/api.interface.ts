import { HttpHeaders, HttpParams } from '@angular/common/http';

export type HTTP_VERB =
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'POST'
  | 'PUT';

export interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  withCredentials?: boolean;
}

export interface ApiResponseInterface {
  success: boolean;
  codeMessage: string | null;
  libelleMessage: string | null;
  body: any;
}