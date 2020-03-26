import * as React from 'react';
import { useForm } from 'react-hook-form';
import omit from 'lodash/omit';
import { useHistory } from 'react-router-dom';

import { DataSource, createDataSources, checkConnexion } from 'interfaces/DataSources';
import { Button, Input, Row, Col, Form, PageHeader } from 'antd';

const DataSourceCreate = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const { register, handleSubmit, getValues } = useForm<Omit<DataSource, '_id'>, {}>();
  const [insertDatasource, { status: loadingCreate }] = createDataSources();
  const onSubmit = async (data: {}) => {
    // console.log(form);
    await insertDatasource(data);
    history.push('/datasources');
  };
  const [connectionCheck, { status: statusCheckConnexion }] = checkConnexion();
  const onTest = () => connectionCheck(omit(getValues(), ['name']));
  // const classes = useStyles();
  return (
    <>
      <Row>
        <Col span="12" offset="6">
          <PageHeader title="New datasources" />
        </Col>
      </Row>
      <Row>
        <Col span="12" offset="6">
          <Form layout="horizontal" onFinish={onSubmit} initialValues={{ dbPort: 27017 }}>
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
          {/* <form className={classes.root} onSubmit={handleSubmit(onSubmit)}> */}
          {/* <TextField
              label="Name"
              required
              name="name"
              inputProps={{ ref: register({ required: true }) }}
              placeholder='i.e. "Production DB (readonly)" or "Internal Admin API"'
            /> */}
          {/* <Divider orientation="vertical" /> */}
          {/* <TextField
              label="Host"
              placeholder="IP address or hostname of your database"
              inputProps={{ ref: register({ required: true }) }}
              required
              name="dbHost"
            /> */}
          {/* <TextField
              label="Port"
              value="27017"
              type="number"
              required
              name="dbPort"
              inputProps={{ ref: register({ required: true }) }}
            /> */}
          {/* <TextField
              label="Database name"
              required
              name="dbName"
              inputProps={{ ref: register({ required: true }) }}
            /> */}
          {/* <TextField
              label="Database username"
              name="dbUsername"
              inputProps={{ ref: register() }}
            /> */}
          {/* <TextField
              label="Database password"
              type="password"
              name="dbPassword"
              inputProps={{ ref: register() }}
            /> */}
          {/* <Button variant="contained" onClick={onTest}>
              Test connexion
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Create datasource
            </Button> */}
          {/* </form> */}
        </Col>
      </Row>
    </>
  );
};

export { DataSourceCreate };
