import { useMutation, useQuery, queryCache } from 'react-query';
import { client } from 'interfaces/Fetch';

export interface DataSourceBase {
  _id: string;
  name: string;
  type: string;
}
export interface DataSource extends DataSourceBase {
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUsername: string;
  dbPassword: string;
}

export interface DataSourceRest extends DataSourceBase {
  url: string;
}

function getDataSources() {
  // eslint-disable-next-line
  return useQuery<{ data: DataSource[] }, {}>('datasources', () => client.get('/datasources'));
}

function getDataSource(id: string) {
  // eslint-disable-next-line
  return useQuery<{ data: DataSource }, {}>(`datasource:${id}`, () => client.get(`/datasources/${id}`));
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

export { getDataSource, getDataSources, createDataSources, checkConnexion };
