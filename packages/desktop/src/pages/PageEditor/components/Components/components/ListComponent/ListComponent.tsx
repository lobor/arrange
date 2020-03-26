import * as React from 'react';
import { List } from 'antd';

import { TextField } from './components/TextField';
import { TextItem } from './components/TextItem';

const ListComponent = () => {
  return <List size="small" dataSource={[<TextItem />, <TextField />]} renderItem={item => item} />;
};

export { ListComponent };
