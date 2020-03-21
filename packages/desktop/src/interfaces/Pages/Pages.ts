import { useMutation, useQuery, queryCache } from 'react-query';
import { client } from '../Fetch'
import { Component } from '../Components'

interface Page {
  _id: string;
  name: string;
  components: Component[];
}
function pages () {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<{ data: Omit<Page, 'Component'>[] }, any>('pages', () => {
    return client.get('/pages')
  });
}

function createPage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation<Page, Pick<Page, 'name'>>(
    (data) => {
      return client.post('/pages', data);
    },
    {
      onSuccess: () => {
        queryCache.refetchQueries(`pages`)
      }
    }
  );
}

function getPages (id: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<{ data: Page }, any>(`pages:${id}`, () => {
    return client.get(`/pages/${id}`)
  });
}

export { createPage, pages, getPages }