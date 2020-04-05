import * as React from 'react';
import Handlebars from 'handlebars';
import { Table, Form, Input, Typography } from 'antd';
// @ts-ignore
import { calcGridItemPosition } from 'react-grid-layout/build/calculateUtils';

import { Component as Item } from 'interfaces/Components';
import { scopeContext } from '../../../../context/scope';
import { COMPONENT, gridLayout } from '../../../../constants';

const dataSource: {}[] = [];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }
];

interface IsolateComponentProps {
  component: Item;
}
const IsolateComponent: React.FC<IsolateComponentProps> = ({ component }) => {
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
  let value
  try {
    const templateValue = Handlebars.compile(component.defaultValue || '');
    value = templateValue({ ...scopes.components, ...scopes.queries })
  } catch (e) {
    console.log(e)
  }
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
              value={value || undefined}
            />
          </Form.Item>
        </Form>
      )}
      {type === COMPONENT.text.type && (
        <Typography>{value || 'Loading...'}</Typography>
      )}
      {type === COMPONENT.table.type && (
        <Table style={{ width }} size="small" scroll={{ y: `${height - 39 - 56}px` }} dataSource={dataSource} columns={columns} />
      )}
    </>
  );
};

export { IsolateComponent };
