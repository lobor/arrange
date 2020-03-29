import * as React from 'react';
import omit from 'lodash/omit';
import { useHistory } from 'react-router-dom';

import { DataSource, createDataSources, checkConnexion } from 'interfaces/DataSources';
import { Button, Input, Row, Col, Form, PageHeader } from 'antd';

const DataSourceCreate = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [insertDatasource, { status: loadingCreate }] = createDataSources();
  const onSubmit = async (data: {}) => {
    await insertDatasource(data);
    history.push('/datasources');
  };
  const [connectionCheck, { status: statusCheckConnexion }] = checkConnexion();
  const onTest = () => {
    connectionCheck(omit(form.getFieldsValue() as DataSource, ['name']));
  };
  return (
    <>
      <Row>
        <Col span="12" offset="6">
          <PageHeader title="New datasources" />
        </Col>
      </Row>
      <Row>
        <Col span="12" offset="6">
          <Form
            layout="horizontal"
            onFinish={onSubmit}
            initialValues={{ dbPort: 27017 }}
            form={form}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input
                autoFocus
                placeholder='i.e. "Production DB (readonly)" or "Internal Admin API"'
              />
            </Form.Item>
            <Form.Item label="Host" name="dbHost" rules={[{ required: true }]}>
              <Input placeholder="IP address or hostname of your database" />
            </Form.Item>
            <Form.Item label="Port" name="dbPort" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Database name" name="dbName" rules={[{ required: true }]}>
              <Input placeholder="leopole" />
            </Form.Item>
            <Form.Item label="Database username" name="dbUsername">
              <Input placeholder="user1" />
            </Form.Item>
            <Form.Item label="Database password" name="dbPassword">
              <Input type="password" placeholder="user1" />
            </Form.Item>
            <Form.Item>
              <Button onClick={onTest} loading={statusCheckConnexion === 'loading'}>
                Test connexion
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loadingCreate === 'loading'}
                style={{ marginLeft: 8 }}
              >
                Create datasource
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export { DataSourceCreate };
