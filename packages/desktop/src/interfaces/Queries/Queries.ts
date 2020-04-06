import * as React from 'react';
import { useMutation, useQuery, queryCache } from 'react-query';
import omit from 'lodash/omit';

import { client } from '../Fetch';
import { scopeContext } from '../../pages/PageEditor/context/scope';

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

export interface QueriesBase {
  _id: string;
  name: string;
  datasource: string;
  page: string;
}
export interface Queries extends QueriesBase {
  method: Method;
}
export interface QueriesRest {
  path: string;
  url: string;
}
function queries() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { addScopes } = React.useContext(scopeContext);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<{ data: Queries[] }, any>('queries', async () => {
    const queries = await client.get('/queries');
    addScopes(queries.data, 'queries');
    return queries;
  });
}

function createQueries() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation<Queries, Pick<Queries, 'name' | 'page'>>(
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
