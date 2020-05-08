import * as React from 'react';
import { useMutation, queryCache } from 'react-query';
import { client } from '../Fetch';
import omit from 'lodash/omit';

import { scopeContext } from '../../pages/PageEditor/context/scope';

export type ScopeType = 'textField' | 'text' | 'table' | 'form';
export type InputType = 'text' | 'password' | 'number';
export enum ItemType {
  text = 'text',
  number = 'number'
}
export interface Item extends Omit<Component, 'type'> {
  type: ItemType;
}
export interface Component {
  _id?: string;
  defaultValue?: string | number;
  disableWhen?: string;
  label?: string;
  inputType: InputType;
  items?: Item[];
  name: string;
  onBlur?: string;
  selectedRow: object;
  page: string;
  placeholder?: string;
  position: {
    x: number;
    y: number;
    h: number;
    w: number;
  } | null;
  required: boolean;
  type: ScopeType;
  validation: boolean;
  whenHide?: string;
  data?: any;
}

export type ComponentText = Pick<
  Component,
  '_id' | 'defaultValue' | 'type' | 'name' | 'page' | 'whenHide' | 'position'
>;

function createComponent() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(
    data => {
      return client.post('/components', data);
    },
    {
      onSuccess: data => {
        queryCache.refetchQueries(`pages:${data.data.page}`);
      }
    }
  );
}
function deleteComponent() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { removeScope } = React.useContext(scopeContext);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(
    data => {
      return client.delete('/components', data);
    },
    {
      onSuccess: data => {
        removeScope(data.data.name);
        queryCache.refetchQueries(`pages:${data.data.page}`);
      }
    }
  );
}

function putComponent() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation(
    data => {
      return client.put('/components', omit(data, ['page', 'type']));
    },
    {
      onSuccess: data => {
        queryCache.refetchQueries(`pages:${data.data.page}`);
      }
    }
  );
}

export { createComponent, deleteComponent, putComponent };
