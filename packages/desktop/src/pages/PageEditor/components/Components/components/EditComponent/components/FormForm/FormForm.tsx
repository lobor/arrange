import * as React from 'react';
import { Select, Popconfirm, Form, Input, Button, Divider, Collapse } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ItemType, Component } from 'interfaces/Components';

import { AutoCompleteScope } from 'components/AutoCompleteScope';

interface FormFormProps {
  initialValues: Component;
}

const FormForm: React.FC<FormFormProps> = ({ initialValues }) => {
  const [formNew] = Form.useForm();
  return (
    <>
      <AutoCompleteScope
        formItemProps={{
          label: 'Default value',
          name: 'defaultValue',
          validateTrigger: ['onChange', 'onBlur']
        }}
      />
      <AutoCompleteScope
        formItemProps={{
          label: 'On submit form',
          name: 'onSubmit',
          validateTrigger: ['onChange', 'onBlur']
        }}
      />
      <Divider orientation="left">Fields</Divider>
      <Form.List name="items">
        {(fields, { add, remove }) => {
          return (
            <div>
              <Collapse defaultActiveKey={[]}>
                {fields.map((field, index) => {
                  const item = (initialValues.items || [])[index] || {};
                  return (
                    <Collapse.Panel header={item.name} key={index}>
                      <Form.Item required={false} key={field.key}>
                        <Form.Item
                          name={[field.name, 'name']}
                          fieldKey={([field.fieldKey, 'name'] as unknown) as number}
                          validateTrigger={['onChange', 'onBlur']}
                          label="Name"
                          rules={[
                            {
                              required: true,
                              whitespace: true
                            }
                          ]}
                        >
                          <Input placeholder="Name of element" />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, 'label']}
                          fieldKey={([field.fieldKey, 'label'] as unknown) as number}
                          validateTrigger={['onChange', 'onBlur']}
                          label="Label"
                          rules={[
                            {
                              required: true,
                              whitespace: true
                            }
                          ]}
                        >
                          <Input placeholder="Label" />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, 'type']}
                          fieldKey={([field.fieldKey, 'type'] as unknown) as number}
                          label="Element type"
                        >
                          <Select>
                            <Select.Option value="text">Text</Select.Option>
                            <Select.Option value="number">Number</Select.Option>
                            <Select.Option value="textarea">Text area</Select.Option>
                            <Select.Option value="select">Select</Select.Option>
                          </Select>
                        </Form.Item>
                        <AutoCompleteScope
                          formItemProps={{
                            label: 'Default value',
                            name: [field.fieldKey, 'defaultValue']
                          }}
                        />
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: '0 8px' }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Form.Item>
                    </Collapse.Panel>
                  );
                })}
              </Collapse>
              <Form.Item>
                <Popconfirm
                  onConfirm={() => {
                    add({ name: formNew.getFieldValue('itemName'), type: ItemType.text });
                  }}
                  title={() => (
                    <Form form={formNew}>
                      <Form.Item
                        name="itemName"
                        rules={[
                          {
                            required: true
                          }
                        ]}
                        noStyle
                      >
                        <Input placeholder="Field name" />
                      </Form.Item>
                    </Form>
                  )}
                >
                  <Button type="dashed" style={{ width: '100%' }}>
                    <PlusOutlined /> Add field
                  </Button>
                </Popconfirm>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </>
  );
};

export { FormForm };
