import * as React from 'react';
import { useDrag } from 'react-dnd';
import { List } from 'antd';

import { COMPONENT, TYPE_DRAG } from '../../../../../constants';

const TextItem = () => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: TYPE_DRAG.component, component: COMPONENT.text },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  return (
    <div ref={dragRef} style={{ opacity }}>
      <List.Item>Text</List.Item>
    </div>
  );
};

export { TextItem };
