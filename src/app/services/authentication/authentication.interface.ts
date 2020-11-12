export interface LoginResponse {
  ok: boolean;
  errorStatus?: LoginErrorStatus;
}

export enum LoginErrorStatus {
  WRONG_CREDENTIALS = `wrong-credential`,
  ACCOUNT_DISABLED = 'account-disabled',
}
