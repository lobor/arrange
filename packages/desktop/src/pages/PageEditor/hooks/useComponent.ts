// import { useState } from 'react';
import { ResponseValues } from 'axios-hooks';
import { useAxios } from '../../../hooks/useAxios';
import { Item } from '../../../context/component';

function useComponent(id: string): [ResponseValues<Item[]>, () => void] {
  const [{ data, loading, error }, refetch] = useAxios<Item[]>(
    {
      url: 'getComponentPage',
      params: { id }
    },
    { useCache: false }
  );
  return [{ data, loading, error }, refetch];
}

export { useComponent };
