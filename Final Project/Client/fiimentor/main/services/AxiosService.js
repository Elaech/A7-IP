import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export let errorResponse: string;

export class AxiosService {

  static handleErrors(error: AxiosError) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      errorResponse = error.response.data;
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

  async get(urlPath: string, params?, config?: AxiosRequestConfig,) {
    try {
      const axiosResponse = await this._AXIOS.get(urlPath, { ...config, params },);

      return axiosResponse.data;
    } catch (error) {
      AxiosService.handleErrors(error);
      throw error;
    }
  }

  async post(urlPath: string, body, config?: AxiosRequestConfig) {
    try {
      const axiosResponse: AxiosResponse = await this._AXIOS.post(urlPath, body, config);
      return axiosResponse.data;
    } catch (error) {
      AxiosService.handleErrors(error);
      throw error;
    }
  }

  async put(
    urlPath: string,
    body,
    config?: AxiosRequestConfig,
  ){
    try {
      const axiosResponse: AxiosResponse = await this._AXIOS(
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

  async delete(
    urlPath: string,
    params?,
    config?: AxiosRequestConfig,
  ){
    try {
      const axiosResponse: AxiosResponse = await this._AXIOS.delete(
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
