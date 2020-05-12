import * as React from 'react';
import { Card, Space } from 'antd';

import { dragContext } from '../../../../context/drag';
import { COMPONENT } from '../../../../constants';

const elements = [
  {
    label: 'Text',
    size: { h: 1, w: 3 },
    type: COMPONENT.text.type
  },
  {
    label: 'TextField',
    size: { h: 1, w: 3 },
    type: COMPONENT.textField.type
  },
  {
    label: 'Table',
    size: { h: 5, w: 5 },
    type: COMPONENT.table.type
  },
  {
    label: 'Form',
    size: { h: 3, w: 5 },
    type: COMPONENT.form.type
  }
];
const ListComponent = () => {
  const { setElementDrag } = React.useContext(dragContext);
  return (
    <Space direction="vertical" style={{ marginLeft: '-24px' }}>
      {elements.map(({ label, size, type }) => (
        <Card
          style={{ width: 300 }}
          key={type}
          hoverable
          draggable
          unselectable="on"
          onDragStart={(e: any) => {
            setElementDrag(size);
            e.componentType = type;
          }}
        >
          {label}
        </Card>
      ))}
    </Space>
  );
};

export { ListComponent };
