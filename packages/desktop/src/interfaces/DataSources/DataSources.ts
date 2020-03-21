import { useQuery } from 'react-query';
import { client } from '../../interfaces/Fetch';

export interface DataSource {
  _id: string;
  name: string;
}

function getDataSources<T = any, R = any>() {
  // eslint-disable-next-line
  return useQuery<{ data: DataSource[] }, {}>('datasources', () => client.get('/datasources'));
}

export { getDataSources };
