import * as React from 'react';
import { Form, Input } from 'antd';

const FormText = () => {
  console.log('toto')
  return (
      <Form.Item label="Default value" name="defaultValue">
        <Input name="defaultValue" />
      </Form.Item>
  );
};

export { FormText };
