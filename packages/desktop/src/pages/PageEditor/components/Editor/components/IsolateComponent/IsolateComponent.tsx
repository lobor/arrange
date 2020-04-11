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
  const handleSelectedRow = React.useCallback(
    (selectedRow: any) => {
      updateScope(component.name, { ...component, selectedRow }, 'components');
    },
    [component, updateScope]
  );

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
      console.log({ [component.name]: value });
      Comp = (
        <Form layout="horizontal" initialValues={{ [component.name]: value }}>
          <Form.Item
            label={component.label}
            name={component.name}
            rules={[{ required: component.required }]}
          >
            <Input
              placeholder={component.placeholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateScope(
                  component.name,
                  { ...component, value: e.currentTarget.value },
                  'components'
                )
              }
              value={value}
            />
          </Form.Item>
        </Form>
      );
      break;
    case COMPONENT.table.type:
      const keyScope = ((component.data || '') as string).replace(/[{}]/g, '');
      Comp = (
        <Table
          component={component}
          width={width}
          height={height}
          onSelectedRow={handleSelectedRow}
          data={
            (scopes.queries as any)[keyScope] ? Object.values((scope as any)[keyScope] as any) : []
          }
        />
      );
      break;
  }
  return <>{Comp}</>;
};

export { IsolateComponent };
