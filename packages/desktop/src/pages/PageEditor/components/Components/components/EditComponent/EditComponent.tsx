import * as React from 'react';
import omit from 'lodash/omit';
import { Empty, Popconfirm, Form, Input, Divider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { deleteComponent, putComponent } from 'interfaces/Components';
import { COMPONENT } from '../../../../constants';
import { componentContext } from '../../../../context/component';
import { FormText } from './components/FormText';
import { FormTable } from './components/FormTable';
import { FormTextField } from './components/FormTextField';
import { FormForm } from './components/FormForm';

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
      omit<any>({ ...item, ...form.getFieldsValue(), id: item!._id }, ['_id', '__v', 'page'])
    );
  }, [updateComponent, item, form]);

  const handleChange = React.useCallback(() => {
    handleUpdateComponent();
  }, [handleUpdateComponent]);

  React.useEffect(() => {
    if (item) {
      form.resetFields();
      form.setFieldsValue(item);
    }
  }, [item, form]);

  if (!item) return <Empty description="Select one component" />;
  return (
    <div>
      <Form form={form} layout="vertical" onValuesChange={handleChange}>
        <Divider orientation="left">Basic</Divider>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input
            onBlur={handleUpdateComponent}
            size="large"
            addonAfter={
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
        {item.type === COMPONENT.table.type && <FormTable />}
        {item.type === COMPONENT.text.type && <FormText />}
        {item.type === COMPONENT.textField.type && <FormTextField />}
        {item.type === COMPONENT.form.type && <FormForm initialValues={item} />}
      </Form>
    </div>
  );
};

export { EditComponent };
