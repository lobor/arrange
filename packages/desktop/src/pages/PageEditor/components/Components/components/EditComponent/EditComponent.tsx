import * as React from 'react';
import omit from 'lodash/omit';
import styled from 'styled-components';
import { Popconfirm, Switch, Select, Collapse, Form, Input } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { DeleteOutlined } from '@ant-design/icons';

import { Component as Item, deleteComponent, putComponent } from 'interfaces/Components';
import { componentContext } from '../../../../context/component';

const Container = styled.div`
  .MuiFormControl-root {
    width: 100%;
  }
`;

const EditComponent = () => {
  const { item, toggleItem } = React.useContext(componentContext);
  const [values, setValue] = React.useState<Item | undefined>(item);

  const [removeComponent] = deleteComponent();
  const [updateComponent] = putComponent();

  const handleDelete = React.useCallback(async () => {
    await removeComponent({ data: { id: item!._id } });
    toggleItem();
  }, [removeComponent, item, toggleItem]);

  const handleUpdateComponent = React.useCallback(
    // () => console.log(values),
    () => updateComponent({ ...omit(values, ['_id', '__v', 'page']), id: values!._id }),
    [updateComponent, values]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.currentTarget.name);
      const name = e.currentTarget.name ? e.currentTarget.name : 'inputType';
      const value = e.currentTarget.value
        ? e.currentTarget.value
        : e.currentTarget.getAttribute('data-value');
      setValue({ ...values!, [name]: value || '' });
    },
    [values]
  );

  const handleChangeInputType = React.useCallback(
    (value: SelectValue) => setValue({ ...values!, inputType: value as Item['inputType'] }),
    [values]
  );

  const handleChangeRequired = React.useCallback(
    (checked: boolean) => {
      setValue({ ...values!, required: checked });
      handleUpdateComponent();
    },
    [values, handleUpdateComponent]
  );

  React.useEffect(() => {
    if (item) {
      setValue(item);
    }
  }, [item]);

  if (!values || !item) return null;
  console.log(values);
  return (
    <Container>
      <Form layout="vertical" initialValues={values}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input.Search
            onChange={handleChange}
            onBlur={handleUpdateComponent}
            onSearch={handleDelete}
            enterButton={
              <Popconfirm
                title="Are you sure delete this component?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined />
              </Popconfirm>
            }
          />
        </Form.Item>
        <Collapse defaultActiveKey={['Basic']} bordered={false}>
          <Collapse.Panel header="Basic" key="Basic">
            <Form.Item label="Label" name="label" rules={[{ required: true }]}>
              <Input onChange={handleChange} name="label" onBlur={handleUpdateComponent} />
            </Form.Item>
            <Form.Item label="Type" name="inputType" rules={[{ required: true }]}>
              <Select
                defaultValue={values.inputType}
                style={{ width: 120 }}
                onChange={handleChangeInputType}
              >
                <Select.Option value="text">Text</Select.Option>
                <Select.Option value="password">Password</Select.Option>
                <Select.Option value="date">Date</Select.Option>
                <Select.Option value="email">Email</Select.Option>
                <Select.Option value="number">Number</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Default value" name="defaultValue">
              <Input onChange={handleChange} name="defaultValue" onBlur={handleUpdateComponent} />
            </Form.Item>
            <Form.Item label="Placeholder text" name="placeholder">
              <Input onChange={handleChange} name="placeholder" onBlur={handleUpdateComponent} />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel header="Validation" key="Validation">
            <Form.Item label="Required field" name="required">
              <Switch onChange={handleChangeRequired} />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel header="Advanced" key="Advanced">
            <Form.Item label="On blur run (query)">
              <Input onChange={handleChange} name="onBlur" onBlur={handleUpdateComponent} />
            </Form.Item>
            <Form.Item label="Disable when true" name="disableWhen">
              <Input onChange={handleChange} name="disableWhen" onBlur={handleUpdateComponent} />
            </Form.Item>
          </Collapse.Panel>
          <Collapse.Panel header="Display" key="Display">
            <Form.Item label="Hide when true" name="whenHide">
              <Input onChange={handleChange} name="whenHide" onBlur={handleUpdateComponent} />
            </Form.Item>
          </Collapse.Panel>
        </Collapse>
      </Form>
    </Container>
  );
};

export { EditComponent };
