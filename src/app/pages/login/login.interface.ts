export interface LoginFormValues {
  email: string;
  password: string;
}

export enum REDIRECT_REASON {
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  LOGIN_REQUIRED = 'LOGIN_REQUIRED',
}
