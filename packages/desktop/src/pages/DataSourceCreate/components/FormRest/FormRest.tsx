import * as React from 'react';
import { Row, Col, Form, Button, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const FormRest = () => {
  return (
    <>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input placeholder='i.e. "Production DB (readonly)" or "Internal Admin API"' />
      </Form.Item>
      <Form.Item label="Base url" name="url" rules={[{ required: true }]}>
        <Input placeholder="IP address or hostname of your database" />
      </Form.Item>
      <Form.List name="headers">
        {(fields, { add, remove }) => {
          const size = fields.length;
          const span = size > 1 ? '11' : '12';
          return (
            <>
              <Form.Item label={'Headers'} required={false}>
                {fields.map((field, index) => (
                  <Row>
                    <Col span={span}>
                      <Form.Item {...field} key={`name-${field.key}`} name={[index, 'name']}>
                        <Input placeholder="Content-Type" />
                      </Form.Item>
                    </Col>
                    <Col span={span}>
                      <Form.Item {...field} key={`value-${field.key}`} name={[index, 'value']}>
                        <Input placeholder="application/json" />
                      </Form.Item>
                    </Col>
                    {size > 1 && (
                      <Col span="2">
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: '0 8px' }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      </Col>
                    )}
                  </Row>
                ))}
              </Form.Item>
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: '60%' }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </>
  );
};

export { FormRest };
