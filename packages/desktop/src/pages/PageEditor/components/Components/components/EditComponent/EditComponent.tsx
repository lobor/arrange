import * as React from 'react';
import omit from 'lodash/omit';
import { Popconfirm, Form, Input } from 'antd';
// import { SelectValue } from 'antd/lib/select';
import { DeleteOutlined } from '@ant-design/icons';

import { Component as Item, deleteComponent, putComponent } from 'interfaces/Components';
import { COMPONENT } from '../../../../constants';
import { componentContext } from '../../../../context/component';
import { FormText } from './components/FormText';
import { FormTable } from './components/FormTable';
import { FormTextField } from './components/FormTextField';

const EditComponent = () => {
  const [form] = Form.useForm();
  const { item, toggleItem } = React.useContext(componentContext);

  const [removeComponent] = deleteComponent();
  const [updateComponent] = putComponent();

  const handleDelete = React.useCallback(async () => {
    await removeComponent({ data: { id: item!._id } });
    toggleItem();
  }, [removeComponent, item, toggleItem]);

  const handleUpdateComponent = React.useCallback(() => {
    updateComponent(
      omit<any>({ ...form.getFieldsValue(), id: item!._id, ...item }, ['_id', '__v', 'page'])
    );
  }, [updateComponent, item, form]);

  const handleChange = React.useCallback((changedValues: any, values: any) => {
    form.setFieldsValue(changedValues);
    // handleUpdateComponent();
    console.log(form.getFieldsValue())
    updateComponent(
      omit<any>({ ...form.getFieldsValue(), id: item!._id, ...item }, ['_id', '__v', 'page'])
    )
    
    // const name = e.currentTarget.name ? e.currentTarget.name : 'inputType';
    // const value = e.currentTarget.value
    //   ? e.currentTarget.value
    //   : e.currentTarget.getAttribute('data-value');
    // setValue({ ...values!, [name]: value || '' });
  }, []);
  // const handleChange = React.useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const name = e.currentTarget.name ? e.currentTarget.name : 'inputType';
  //     const value = e.currentTarget.value
  //       ? e.currentTarget.value
  //       : e.currentTarget.getAttribute('data-value');
  //     setValue({ ...values!, [name]: value || '' });
  //   },
  //   [values]
  // );

  // const handleChangeInputType = React.useCallback(
  //   (value: SelectValue) => setValue({ ...values!, inputType: value as Item['inputType'] }),
  //   [values]
  // );

  // const handleChangeRequired = React.useCallback(
  //   (checked: boolean) => {
  //     setValue({ ...values!, required: checked });
  //     handleUpdateComponent();
  //   },
  //   [values, handleUpdateComponent]
  // );

  React.useEffect(() => {
    if (item) {
      form.resetFields();
      form.setFieldsValue(item);
    }
  }, [item, form]);

  if (!item) return null;
  // console.log(item)
  return (
    <div>
      <Form form={form} layout="vertical" onValuesChange={handleChange}>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input.Search
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
        {/* <Collapse defaultActiveKey={['Basic']} bordered={false}>
          <Collapse.Panel header="Basic" key="Basic"> */}
        {item.type === COMPONENT.table.type && <FormTable />}
        {item.type === COMPONENT.text.type && <FormText />}
        {item.type === COMPONENT.textField.type && <FormTextField />}
        {/* </Collapse.Panel>
        </Collapse> */}
      </Form>
    </div>
  );
};

export { EditComponent };
