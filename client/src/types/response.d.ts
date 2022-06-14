declare module 'response-type' {
  export interface LoginInfo {
    id: string;
    accessToken: string;
  }

  export interface Response {
    result: boolean;
    loginInfo?: LoginInfo;
  }
}
