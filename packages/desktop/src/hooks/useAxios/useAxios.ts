import * as React from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Options, makeUseAxios } from 'axios-hooks';

const API_URL = 'http://localhost:8080';

const axiosInstance = axios.create({ baseURL: API_URL });

const useAxiosInstance = makeUseAxios({
  axios: axiosInstance
});

const keys: {
  [key: string]: string;
} = {
  updateComponent: '/updateComponent',
  deleteComponent: '/deleteComponent',
  getComponentPage: '/getComponentPage',
  insertComponent: '/insertComponent',
  getPage: '/getPage',
  createPage: '/createPage',
  pages: '/pages',
  listDatasource: '/datasources',
  getDatasource: '/datasources/:id'
};

const cache: { [key: string]: any } = {}

const getCacheKey = (url: string, variables: {}) => {
  return `${url}::${JSON.stringify(variables)}`;
}

function useAxios<T = any>(config: AxiosRequestConfig, options?: Options | undefined) {
  const [caheState, setCache] = React.useState<{ [key: string]: any }>(cache)
  config.url = keys[config.url!];

  const [{ data, loading, error }, refetch] = useAxiosInstance<T>(config, options)

  React.useEffect(() => {
    if (data) {
      cache[getCacheKey(config.url!, config.params || config.data)] = data
      setCache(cache)
    }
  }, [data, caheState, config])


  return [{ data: caheState[getCacheKey(config.url!, config.params || config.data)] as T, loading, error }, refetch];
}

export { useAxios };
