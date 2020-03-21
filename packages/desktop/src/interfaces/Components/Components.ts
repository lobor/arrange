import { useContext } from 'react';
import { useMutation, useQuery, queryCache } from 'react-query';
import { Item } from '../../context/component';
import { client } from '../Fetch';

export interface Component extends Item {
  _id: string;
}

const actions = {
  getComponent: (pageId?: string) => ({
    endpoint: `/components${pageId ? `/${pageId}` : ''}`,
    method: 'GET'
  })
};
function createComponent(pageId: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(
    (data) => {
      return client.post('/components', data);
    },
    {
      onSuccess: (data) => {
        queryCache.refetchQueries(`pages:${data.data.page}`)
      }
    }
  );
}
function deleteComponent() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(
    (data) => {
      return client.delete('/components', data);
    },
    {
      onSuccess: (data) => {
        queryCache.refetchQueries(`pages:${data.data.page}`)
      }
    }
  );
}
function getComponent(pageId?: string) {
  // if (pageId) {
  //   return useQuery<Item[]>(actions.getComponent(pageId) as Action<any, any>);
  // }
  // return useQuery<Item[]>(actions.getComponent() as Action<any, any>);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // return useQuery<Item[]>('getComponent', () => {

  // });
  return { payload: [], loading: false, error: false };
}
function putComponent() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(
    (data) => {
      return client.put('/components', data);
    },
    {
      onSuccess: (data) => {
        queryCache.refetchQueries(`pages:${data.data.page}`)
      }
    }
  );
}

export { createComponent, deleteComponent, getComponent, putComponent };
