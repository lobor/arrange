import * as React from 'react';
import classnames from 'classnames';
import { useDrag } from 'react-dnd';

import { Item, componentContext } from '../../../../../../context/component';
import { OverlayComponent } from '../../styles';
import { TextField } from '../../../../../../components/TextField';
import { COMPONENT, TYPE_DRAG } from '../../../../constants';

interface IsolateComponentProps {
  component: Item;
}
const IsolateComponent: React.FC<IsolateComponentProps> = ({ component }) => {
  const { name, position } = component;
  const { item, toggleItem } = React.useContext(componentContext);

  const [{ opacity }, dragRef] = useDrag({
    item: { type: TYPE_DRAG.move, component },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  if (!position) return null;

  const style = { left: position.x, top: position.y, opacity };

  return (
    <OverlayComponent style={style} onClick={() => toggleItem(component)} ref={dragRef}>
      <TextField size="small" className={classnames({ active: item && item.name === name })} />
    </OverlayComponent>
  );
};

export { IsolateComponent };
