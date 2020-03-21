import { useQuery } from 'react-fetching-library';

function getDataSources<T = any, R = any>() {
  // eslint-disable-next-line
  return useQuery<T, R>({
    method: 'GET',
    endpoint: '/datasources'
  });
}

export { getDataSources };
