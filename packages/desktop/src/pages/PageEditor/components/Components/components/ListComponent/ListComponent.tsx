import * as React from 'react';
import List from '@material-ui/core/List';

import { TextField } from './components/TextField'
import { TextItem } from './components/TextItem'

const ListComponent = () => {
  return (
    <List>
      <TextItem />
      <TextField />
    </List>
  );
};

export { ListComponent };
