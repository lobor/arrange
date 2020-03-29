import * as React from 'react';
import { List } from 'antd';

import { dragContext } from '../../../../context/drag';
import { COMPONENT } from '../../../../constants'


const ListComponent = () => {
  const { setElementDrag } = React.useContext(dragContext)
  return (
    <List
      size="small"
      dataSource={[
        <List.Item
          draggable
          unselectable="on"
          onDragStart={e => {
            setElementDrag({ h: 1, w: 3 });
            ((e as any).componentType = COMPONENT.text.type)
          }}
        >
          Text
        </List.Item>,
        <List.Item
          draggable
          unselectable="on"
          onDragStart={e => {
            setElementDrag({ h: 1, w: 3 });
            ((e as any).componentType = COMPONENT.textField.type)
          }}
        >
          TextField
        </List.Item>,
        <List.Item
          draggable
          unselectable="on"
          onDragStart={e => {
            setElementDrag({ h: 5, w: 5 });
            ((e as any).componentType = COMPONENT.table.type)
          }}
        >
          Table
        </List.Item>
      ]}
      renderItem={item => item}
    />
  );
};

export { ListComponent };
