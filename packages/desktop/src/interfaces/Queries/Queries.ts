import { useMutation, useQuery, queryCache } from 'react-query';
import { client } from '../Fetch';
import omit from 'lodash/omit';

export type Method =
  | 'find'
  | 'findOne'
  | 'count'
  | 'distinct'
  | 'aggregate'
  | 'insertOne'
  | 'updateOne'
  | 'deleteOne'
  | 'updateMany';

export interface Queries {
  _id: string;
  name: string;
  method: Method;
}
function queries() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<{ data: Queries[] }, any>('queries', () => {
    return client.get('/queries');
  });
}

function createQueries() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation<Queries, Pick<Queries, 'name'>>(
    data => {
      return client.post('/queries', data);
    },
    {
      onSuccess: () => {
        queryCache.refetchQueries(`queries`);
      }
    }
  );
}

function deleteQueries() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation<Queries, Pick<Queries, '_id'>>(
    data => {
      return client.delete('/queries', { data });
    },
    {
      onSuccess: () => {
        queryCache.refetchQueries(`queries`);
      }
    }
  );
}

function updateQueries() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation<Queries, Queries>(
    data => {
      return client.put(`/queries/${data._id}`, omit(data, ['_id']));
    },
    {
      onSuccess: () => {
        queryCache.refetchQueries(`queries`);
      }
    }
  );
}

export { createQueries, deleteQueries, updateQueries, queries };
