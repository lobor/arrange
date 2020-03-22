import { useMutation, useQuery, queryCache } from 'react-query';
import { client } from 'interfaces/Fetch';

export interface DataSource {
  _id: string;
  name: string;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
}

function getDataSources() {
  // eslint-disable-next-line
  return useQuery<{ data: DataSource[] }, {}>('datasources', () => client.get('/datasources'));
}

function checkConnexion() {
  // eslint-disable-next-line
  return useMutation<{ data: DataSource[] }, Omit<DataSource, '_id' | 'name'>>(
    (params) => {
      return client.post('/datasources/check', params)
    }
  );
}

function createDataSources() {
  // eslint-disable-next-line
  return useMutation(
    data => {
      return client.post('/datasources', data);
    },
    {
      onSuccess: data => {
        queryCache.refetchQueries(`datasources`);
      }
    }
  );
}

export { getDataSources, createDataSources, checkConnexion };
