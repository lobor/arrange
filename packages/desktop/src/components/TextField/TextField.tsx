import * as React from 'react';
import { Form, Input } from 'antd';

import { Component } from 'interfaces/Components';

interface TextFieldProps {
  component: Component;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
}

const TextField: React.FC<TextFieldProps> = ({ component, onChange, value }) => {
  return (
    <Form layout="horizontal" initialValues={{ [component.name]: value }}>
      <Form.Item
        label={component.label}
        name={component.name}
        rules={[{ required: component.required }]}
      >
        <Input placeholder={component.placeholder} onChange={onChange} />
      </Form.Item>
    </Form>
  );
};

export { TextField };
