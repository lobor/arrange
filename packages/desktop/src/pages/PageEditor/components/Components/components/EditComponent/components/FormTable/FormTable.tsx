import * as React from 'react'
import { Form, Input } from 'antd'

const FormTable = () => {
  return (
    <>
      <Form.Item label="Data" name="data">
        <Input name="data" />
        {/* <Input onChange={handleChange} name="defaultValue" onBlur={handleUpdateComponent} /> */}
      </Form.Item>
    </>
  );
};

export { FormTable };
