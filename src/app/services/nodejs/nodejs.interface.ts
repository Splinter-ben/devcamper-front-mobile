/**
 * Nodejs Login Response when OK
 */
export interface NodeJsLoginResponse {
  access_token: string;
  expires_in?: number;
}

/**
 * Nodejs response with user info
 */
export interface NodeJsUserInfoResponse {
  sub: string;
  name: string;
  email: string;
  roles?: Array<string>;
}

/**
 * Nodejs Login Response when something is wrong
 */
export interface NodeJsLoginError {
  status: number;
  statusText: string;
  ok: false;
  error: {
    error: NodeJsLoginErrors;
    error_description: NodeJsLoginErrorDescriptions;
  };
}

/**
 * NodeJs Login Error Types
 */
export enum NodeJsLoginErrors {
  INVALID_GRANT = 'invalid_grant',
}
export enum NodeJsLoginErrorDescriptions {
  WRONG_CREDENTIALS = 'Invalid user credentials',
  ACCOUNT_DISABLED = 'Account disabled',
}

/**
 * Logout
 */
export interface NodeJsLogoutResponse {}
