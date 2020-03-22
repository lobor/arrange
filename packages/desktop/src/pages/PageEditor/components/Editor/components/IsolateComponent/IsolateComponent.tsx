import * as React from 'react';
import classnames from 'classnames';
import { useDrag } from 'react-dnd';
import Handlebars from 'handlebars'

import { Component as Item } from 'interfaces/Components';
import { TextField } from 'components/TextField';
import { componentContext } from '../../../../../../context/component';
import { scopeContext } from '../../../../../../context/scope';
import { OverlayComponent } from '../../styles';
import { TYPE_DRAG } from '../../../../constants';

interface IsolateComponentProps {
  component: Item;
}
const IsolateComponent: React.FC<IsolateComponentProps> = ({ component }) => {
  const { name, position } = component;
  const { item, toggleItem } = React.useContext(componentContext);
  const { scopes } = React.useContext(scopeContext);

  const [{ opacity }, dragRef] = useDrag({
    item: { type: TYPE_DRAG.move, component },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  if (!position) return null;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    toggleItem(component);
  };

  const style = { left: position.x, top: position.y, opacity };
  var templateValue = Handlebars.compile(component.defaultValue || '')
  return (
    <OverlayComponent
      style={{ ...style, ...(component.style || {}) }}
      onClick={handleClick}
      ref={dragRef}
    >
      <TextField
        size="small"
        label={component.label}
        placeholder={component.placeholder}
        name={component.name}
        type={component.inputType}
        value={templateValue(scopes) || undefined}
        required={component.required}
        className={classnames({ active: item && item.name === name })}
      />
    </OverlayComponent>
  );
};

export { IsolateComponent };
