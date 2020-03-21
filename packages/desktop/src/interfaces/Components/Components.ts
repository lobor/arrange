import { useMutation, queryCache } from 'react-query';
import { client } from '../Fetch';
import omit from 'lodash/omit'

export interface Component {
  _id?: string;
  defaultValue?: string | number;
  disableWhen?: string;
  label?: string;
  inputType: string;
  name: string;
  onBlur?: string;
  page: string;
  placeholder?: string;
  position: {
    x: number;
    y: number;
  } | null;
  required: boolean;
  type: string;
  validation: boolean;
  whenHide?: string;
}

function createComponent() {
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

function putComponent() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(
    (data) => {
      return client.put('/components', omit(data, ['type']));
    },
    {
      onSuccess: (data) => {
        queryCache.refetchQueries(`pages:${data.data.page}`)
      }
    }
  );
}

export { createComponent, deleteComponent, putComponent };
