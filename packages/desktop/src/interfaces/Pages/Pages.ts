import * as React from 'react'

import { useMutation, useQuery, queryCache } from 'react-query';
import { client } from '../Fetch'
import { Component } from '../Components'
import { scopeContext } from '../../pages/PageEditor/context/scope'

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
  const { addScopes } = React.useContext(scopeContext)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<{ data: Page }, any>(`pages:${id}`, async () => {
    const pages = await client.get<{}, { data: Page }>(`/pages/${id}`)
    addScopes(pages.data.components)
    return pages
  });
}

export { createPage, pages, getPages }