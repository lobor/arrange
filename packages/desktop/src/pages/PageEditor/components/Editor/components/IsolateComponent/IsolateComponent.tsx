import * as React from 'react';
import classnames from 'classnames';
import { useDrag } from 'react-dnd';
import Handlebars from 'handlebars';

import { Component as Item } from 'interfaces/Components';
import { TextField } from 'components/TextField';
import { Text } from 'components/Text';
import { componentContext } from '../../../../context/component';
import { scopeContext } from '../../../../context/scope';
import { OverlayComponent } from '../../styles';
import { TYPE_DRAG, COMPONENT } from '../../../../constants';

interface IsolateComponentProps {
  component: Item;
}
const IsolateComponent: React.FC<IsolateComponentProps> = ({ component }) => {
  const { name, position, type } = component;
  const { item, toggleItem } = React.useContext(componentContext);
  const { scopes, updateScope } = React.useContext(scopeContext);

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
  var templateValue = Handlebars.compile(component.defaultValue || '');

  return (
    <OverlayComponent
      style={{ ...style, ...(component.style || {}) }}
      onClick={handleClick}
      ref={dragRef}
    >
      {type === COMPONENT.textField.type && (
        <TextField
          size="small"
          label={component.label}
          placeholder={component.placeholder}
          name={component.name}
          type={component.inputType}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateScope(component.name, { ...component, value: e.currentTarget.value })
          }
          value={templateValue(scopes) || undefined}
          required={component.required}
          className={classnames({ active: item && item.name === name })}
        />
      )}
      {type === COMPONENT.text.type && <Text value={templateValue(scopes) || undefined} />}
    </OverlayComponent>
  );
};

export { IsolateComponent };
