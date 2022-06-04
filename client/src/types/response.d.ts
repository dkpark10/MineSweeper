declare module 'response-type' {
  export interface Response {
    result: boolean;
    message?: string;
    loginInfo?: {
      id: string;
      accessToken: string;
    }
  }
}