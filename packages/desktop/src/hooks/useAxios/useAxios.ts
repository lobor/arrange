import axios, { AxiosRequestConfig } from 'axios'
import axiosHooks, { Options, makeUseAxios } from 'axios-hooks'

const API_URL = 'http://localhost:8080';

const axiosInstance = axios.create({ baseURL: API_URL })

const useAxiosInstance = makeUseAxios({
  axios: axiosInstance
})

const keys: {
  [key: string]: string;
} = {
  getPage: '/getPage',
  createPage: '/createPage',
  pages: '/pages',
  listDatasource: '/datasources',
  getDatasource: '/datasources/:id',
};

function useAxios<T = any> (config: string | AxiosRequestConfig, options?: Options | undefined) {
  if (typeof config === 'string') {
    config = keys[config]
  } else if (config.url) {
    config.url = keys[config.url]
  }

  return useAxiosInstance<T>(config, options)
}

export { useAxios }
