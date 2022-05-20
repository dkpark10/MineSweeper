import axios, { AxiosResponse, AxiosInstance } from 'axios';
import address from '../config/server_address';

let SERVER_ADDRESS: string;
if (process.env.NODE_ENV === 'development') {
  SERVER_ADDRESS = 'http://localhost:8080';
} else {
  SERVER_ADDRESS = address;
}

export interface AxiosInterface {
  get: (url: string, data?: any) => Promise<any>;
  post: (url: string, data?: any) => Promise<any>;
  patch: (url: string, data?: any) => Promise<any>;
  delete: (url: string, data?: any) => Promise<any>;
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

const instance: AxiosInstance = axios.create({

  baseURL: `${SERVER_ADDRESS}`, // 기본 서버 주소 입력
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
})

const axiosApi: AxiosInterface = {

  get: (url: string) => instance.get(url)
    .then((response: AxiosResponse<Response>) => response.data)
    .catch(err => console.error(err)),

  post: (url: string, data: { [key: string]: any }) => instance.post(url, data)
    .then((response: AxiosResponse<Response>) => response.data)
    .catch(err => console.error(err)),

  patch: (url: string, data: { [key: string]: any }) => instance.patch(url, data)
    .then((response: AxiosResponse<Response>) => response.data)
    .catch(err => console.error(err)),

  delete: (url: string, data: { [key: string]: any }) => instance.delete(url, data)
    .then((response: AxiosResponse<Response>) => response.data)
    .catch(err => console.error(err)),
};

// export abstract class AxiosHandler {

//   public static instance: AxiosInstance = axios.create({
//     baseURL: `${SERVER_ADDRESS}`, // 기본 서버 주소 입력
//     headers: {
//       'Content-type': 'application/json',
//       'Accept': 'application/json',
//     },
//     withCredentials: true
//   });
// }

export default axiosApi;