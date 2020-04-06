import * as React from 'react';
import { Form, Button, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import omit from 'lodash/omit';

import { DataSource, checkConnexion } from 'interfaces/DataSources';

interface FormMongoProps {
 form: FormInstance
}

const FormMongo: React.FC<FormMongoProps> = ({ form }) => {
  const [connectionCheck, { status: statusCheckConnexion }] = checkConnexion();
  const onTest = () => {
    connectionCheck(omit(form.getFieldsValue() as DataSource, ['name']));
  };
  return (
    <>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input placeholder='i.e. "Production DB (readonly)" or "Internal Admin API"' />
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
      </Form.Item>
    </>
  );
};

export { FormMongo };
