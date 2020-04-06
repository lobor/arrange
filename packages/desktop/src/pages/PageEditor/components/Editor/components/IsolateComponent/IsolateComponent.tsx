import * as React from 'react';
import Handlebars from 'handlebars';
import { Form, Input, Typography } from 'antd';
// @ts-ignore
import { calcGridItemPosition } from 'react-grid-layout/build/calculateUtils';

import { Table } from 'components/Table';
import { Component as Item } from 'interfaces/Components';
import { scopeContext } from '../../../../context/scope';
import { COMPONENT, gridLayout } from '../../../../constants';

interface IsolateComponentProps {
  component: Item;
}
const IsolateComponent = ({ component }: IsolateComponentProps) => {
  const { position, type } = component;
  const { scopes, updateScope } = React.useContext(scopeContext);

  if (!position) return null;

  const { height, width } = calcGridItemPosition(
    gridLayout,
    position.x,
    position.y,
    position.w,
    position.h
  );
  let value;
  const scope = { ...scopes.components, ...scopes.queries };
  try {
    const templateValue = Handlebars.compile(component.defaultValue || '');
    value = templateValue(scopes.components);
  } catch (e) {
    console.log(e);
  }

  let Comp: React.ReactNode | null = <></>;
  switch (type) {
    case COMPONENT.text.type:
      Comp = <Typography>{value || 'Loading...'}</Typography>;
      break;
    case COMPONENT.textField.type:
      Comp = (
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
              value={value || undefined}
            />
          </Form.Item>
        </Form>
      );
      break;
    case COMPONENT.table.type:
      const toto = ((component.data || '') as string).replace(/[{}]/g, '');
      Comp = (
        <Table
          component={component}
          width={width}
          height={height}
          data={(scopes.queries as any)[toto] ? Object.values((scope as any)[toto] as any) : []}
        />
      );
      break;
  }
  return <>{Comp}</>;
};

export { IsolateComponent };
