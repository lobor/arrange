import * as React from 'react';
import { Form, Input, Select } from 'antd';

interface FormRestProps {
  url: string;
}
const FormRest: React.FC<FormRestProps> = ({ url }) => {
  return (
    <>
      <Form.Item label="Method" name="method" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="GET">GET</Select.Option>
          <Select.Option value="POST">POST</Select.Option>
          <Select.Option value="DELETE">DELETE</Select.Option>
          <Select.Option value="PUT">PUT</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Path" name="path" rules={[{ required: true }]}>
        <Input addonBefore={url} />
      </Form.Item>
    </>
  );
};

export { FormRest };
