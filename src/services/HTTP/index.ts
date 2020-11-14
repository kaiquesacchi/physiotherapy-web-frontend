import axios, { AxiosRequestConfig } from "axios";

const checkToken = () => {
  const token = window.localStorage.getItem("authToken") || null;
  axios.defaults.headers.Authorization = token;
};

export default class HttpService {
  static url = "http://localhost:5000/api/v1";

  static get(path: string, config?: AxiosRequestConfig) {
    checkToken();
    return axios.get(HttpService.url + path, config);
  }

  static post(path: string, data?: object, config?: AxiosRequestConfig) {
    checkToken();
    return axios.post(HttpService.url + path, data, config);
  }

  static put(path: string, data = {}) {
    checkToken();
    return axios.put(HttpService.url + path, data);
  }

  static delete(path: string) {
    checkToken();
    return axios.delete(HttpService.url + path);
  }
}
