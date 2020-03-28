import * as React from 'react';
import { useDrag } from 'react-dnd';
import Handlebars from 'handlebars';
import { Form, Input, Typography } from 'antd';

import { Component as Item } from 'interfaces/Components';
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
      style={{ ...style, ...(component.style || {}), zIndex: 2 }}
      // onClick={handleClick}
      ref={dragRef}
    >
      {type === COMPONENT.textField.type && (
        <Form layout="horizontal">
          <Form.Item
            label={component.label}
            name={component.name}
            rules={[{ required: component.required }]}
          >
            <Input
              placeholder={component.placeholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateScope(component.name, { ...component, value: e.currentTarget.value })
              }
              value={templateValue(scopes) || undefined}
            />
          </Form.Item>
        </Form>
      )}
      {type === COMPONENT.text.type && (
        <Typography>{templateValue(scopes) || undefined}</Typography>
      )}
    </OverlayComponent>
  );
};

export { IsolateComponent };
