import * as React from 'react';
import { Form, Input, Select, Switch } from 'antd';

const FormTextField = () => {
  return (
    <>
      {/* <Collapse.Panel header="Basic" key="Basic"> */}
        <Form.Item label="Label" name="label" rules={[{ required: true }]}>
          <Input name="label" />
          {/* <Input onChange={handleChange} name="label" onBlur={handleUpdateComponent} /> */}
        </Form.Item>
        <Form.Item label="Type" name="inputType" rules={[{ required: true }]}>
          <Select
            style={{ width: 120 }}
          >
          {/* <Select
            defaultValue={values.inputType}
            style={{ width: 120 }}
            onChange={handleChangeInputType}
          > */}
            <Select.Option value="text">Text</Select.Option>
            <Select.Option value="password">Password</Select.Option>
            <Select.Option value="date">Date</Select.Option>
            <Select.Option value="email">Email</Select.Option>
            <Select.Option value="number">Number</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Default value" name="defaultValue">
          <Input name="defaultValue" />
          {/* <Input onChange={handleChange} name="defaultValue" onBlur={handleUpdateComponent} /> */}
        </Form.Item>
        <Form.Item label="Placeholder text" name="placeholder">
          <Input name="placeholder" />
          {/* <Input onChange={handleChange} name="placeholder" onBlur={handleUpdateComponent} /> */}
        </Form.Item>
      {/* </Collapse.Panel> */}
      {/* <Collapse.Panel header="Validation" key="Validation"> */}
        <Form.Item label="Required field" name="required">
          <Switch />
          {/* <Switch onChange={handleChangeRequired} /> */}
        </Form.Item>
      {/* </Collapse.Panel> */}
      {/* <Collapse.Panel header="Advanced" key="Advanced"> */}
        <Form.Item label="On blur run (query)">
          <Input name="onBlur" />
          {/* <Input onChange={handleChange} name="onBlur" onBlur={handleUpdateComponent} /> */}
        </Form.Item>
        <Form.Item label="Disable when true" name="disableWhen">
          <Input name="disableWhen" />
          {/* <Input onChange={handleChange} name="disableWhen" onBlur={handleUpdateComponent} /> */}
        </Form.Item>
      {/* </Collapse.Panel> */}
      {/* <Collapse.Panel header="Display" key="Display"> */}
        <Form.Item label="Hide when true" name="whenHide">
          <Input name="whenHide" />
          {/* <Input onChange={handleChange} name="whenHide" onBlur={handleUpdateComponent} /> */}
        </Form.Item>
      {/* </Collapse.Panel> */}
    </>
  );
};

export { FormTextField };
