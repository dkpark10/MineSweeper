import axios, { AxiosResponse, AxiosInstance } from 'axios';

const SERVER_ADDRESS = 'http://localhost:8080' as const;

export interface AxiosInterface {
  [key: string]: (url: string, data?: any) => Promise<any>;
}

export interface Response {
  result: boolean;
  message?: string;
  data?: any
  loginInfo?: {
    id: string;
    accessToken: string;
  }
}

const config = {
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
};

const axiosApi: AxiosInterface = {

  get: (url: string) => axios.get(url, config)
    .then((response: AxiosResponse<Response>) => response.data)
    .catch(err => console.error(err)),

  post: (url: string, data: { [key: string]: any }) => axios.post(url, data, config)
    .then((response: AxiosResponse<Response>) => response.data)
    .catch(err => console.error(err)),

  patch: (url: string, data: { [key: string]: any }) => axios.patch(url, data, config)
    .then((response: AxiosResponse<Response>) => response.data)
    .catch(err => console.error(err)),

  delete: (url: string, data: { [key: string]: any }) => axios.delete(url, data)
    .then((response: AxiosResponse<Response>) => response.data)
    .catch(err => console.error(err)),
};

export abstract class AxiosHandler {

  public static instance: AxiosInstance = axios.create({
    baseURL: `${SERVER_ADDRESS}`, // 기본 서버 주소 입력
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: true
  });

  public static async get<T>(url: string): Promise<T> {

    const ret = await this.instance.get<T>(url)
    return ret.data;
  }

  public static async post<T>(url: string, data?: any): Promise<T> {

    try {
      return await this.instance.post(url, data);
    }
    catch (e) {
      return e;
    }
  }

  public static async patch<T>(url: string, data?: any): Promise<T> {

    try {
      return await this.instance.patch(url, data);
    }
    catch (e) {
      return e;
    }
  }
}

export default axiosApi;