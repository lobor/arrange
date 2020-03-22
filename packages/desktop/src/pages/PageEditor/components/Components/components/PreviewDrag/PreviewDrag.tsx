import * as React from 'react';
import { DragLayer } from 'react-dnd';
import { Identifier } from 'dnd-core';
import { XYCoord } from 'react-dnd';

import { TextField } from 'components/TextField';
import { Component as Item } from 'interfaces/Components';
import { COMPONENT } from '../../../../constants';

interface PreviewDragProps {
  item: {
    type: string;
    component: Item;
  };
  itemType?: Identifier | null;
  initialOffset?: XYCoord | null;
  currentOffset?: XYCoord | null;
  isDragging?: boolean;
}

const layerStyles: React.CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(props: PreviewDragProps) {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform
  };
}

const PreviewDrag = DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))((props: PreviewDragProps) => {
  const { item, isDragging } = props;
  function renderItem() {
    switch (item.component.type) {
      case COMPONENT.textField.type:
        return <TextField style={{ width: '10%' }} size="small" />;
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(props)}>{item.component && renderItem()}</div>
    </div>
  );
});

export { PreviewDrag };
