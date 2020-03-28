import * as React from 'react';
import { List } from 'antd';

// import { TextField } from './components/TextField';
// import { TextItem } from './components/TextItem';

const ListComponent = () => {
  return (
    <List
      size="small"
      dataSource={[
        <List.Item
          draggable
          unselectable="on"
          onDragStart={e => ((e as any).componentType = 'text')}
        >
          Text
        </List.Item>,
        <List.Item
          draggable
          unselectable="on"
          onDragStart={e => ((e as any).componentType = 'textField')}
        >
          TextField
        </List.Item>
      ]}
      renderItem={item => item}
    />
  );
};

export { ListComponent };
