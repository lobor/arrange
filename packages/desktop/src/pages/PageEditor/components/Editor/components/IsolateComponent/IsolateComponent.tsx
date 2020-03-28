import * as React from 'react';
import Handlebars from 'handlebars';
import { Form, Input, Typography } from 'antd';

import { Component as Item } from 'interfaces/Components';
import { scopeContext } from '../../../../context/scope';
import { COMPONENT } from '../../../../constants';

interface IsolateComponentProps {
  component: Item;
}
const IsolateComponent: React.FC<IsolateComponentProps> = ({ component }) => {
  const { position, type } = component;
  const { scopes, updateScope } = React.useContext(scopeContext);

  if (!position) return null;

  var templateValue = Handlebars.compile(component.defaultValue || '');

  return (
    <>
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
    </>
  );
};

export { IsolateComponent };
