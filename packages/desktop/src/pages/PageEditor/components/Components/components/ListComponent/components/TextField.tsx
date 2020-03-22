import * as React from 'react';
import { useDrag } from 'react-dnd';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { COMPONENT, TYPE_DRAG } from '../../../../../constants';

const TextField = () => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: TYPE_DRAG.component, component: COMPONENT.textField },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  return (
    <div ref={dragRef} style={{ opacity }}>
      <ListItem>
        <ListItemText primary="TextField" />
      </ListItem>
    </div>
  );
};

export { TextField };
