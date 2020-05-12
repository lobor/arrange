import * as React from 'react';
import { Form, Checkbox, Divider, Select } from 'antd';

import { AutoCompleteScope } from 'components/AutoCompleteScope';

const FormText = () => {
  return (
    <>
      <AutoCompleteScope formItemProps={{ label: 'Default value', name: 'defaultValue' }} />
      <Divider orientation="left">Style</Divider>
      <Form.Item name="strong" valuePropName="checked">
        <Checkbox>Bold</Checkbox>
      </Form.Item>
      <Form.Item name="underline" valuePropName="checked">
        <Checkbox>Underline</Checkbox>
      </Form.Item>
      <Form.Item label="Format" name="format">
        <Select>
          <Select.Option value="1">Title 1</Select.Option>
          <Select.Option value="2">Title 2</Select.Option>
          <Select.Option value="3">Title 3</Select.Option>
          <Select.Option value="4">Title 4</Select.Option>
          <Select.Option value="body">Body</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
};

export { FormText };
