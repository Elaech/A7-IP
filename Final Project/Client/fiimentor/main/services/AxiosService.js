import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class AxiosService {

  static handleErrors(error: AxiosError) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('API CORE Error', error);
    }
  }

  _AXIOS: AxiosInstance;

  constructor(apiConfig: AxiosRequestConfig) {
    this._AXIOS = axios.create(apiConfig);
  }

  async get<P, R>(urlPath: string, params?: P, config?: AxiosRequestConfig,): Promise<R> {
    try {
      const axiosResponse: AxiosResponse<R> = await this._AXIOS.get<R>(urlPath, { ...config, params },);

      return axiosResponse.data;
    } catch (error) {
      AxiosService.handleErrors(error);
      throw error;
    }
  }

  async post<B, R>(urlPath: string, body: B, config?: AxiosRequestConfig): Promise<R> {
    try {
      const axiosResponse: AxiosResponse<R> = await this._AXIOS.post(urlPath, body, config);
      return axiosResponse.data;
    } catch (error) {
      AxiosService.handleErrors(error);
      throw error;
    }
  }

  async put<B, R>(
    urlPath: string,
    body: B,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    try {
      const axiosResponse: AxiosResponse<R> = await this._AXIOS.put<R>(
        urlPath,
        body,
        config,
      );
      return axiosResponse.data;
    } catch (error) {
      AxiosService.handleErrors(error);
      throw error;
    }
  }

  async delete<P, R>(
    urlPath: string,
    params?: P,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    try {
      const axiosResponse: AxiosResponse<R> = await this._AXIOS.delete<R>(
        urlPath,
        { ...config, params },
      );
      return axiosResponse.data;
    } catch (error) {
      AxiosService.handleErrors(error);
      throw error;
    }
  }


}
