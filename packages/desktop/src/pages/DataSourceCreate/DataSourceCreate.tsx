import * as React from 'react';
import { Alert, Button, Select, Row, Col, Form, PageHeader } from 'antd';
import { Redirect } from 'react-router-dom';
import { createDataSources } from 'interfaces/DataSources';

import { FormDatasource } from 'components/FormDatasource'

const DataSourceCreate = () => {
  const [form] = Form.useForm();
  const [insertDatasource, { status: loadingCreate, error, data }] = createDataSources();
  const onSubmit = async (data: {}) => {
    insertDatasource(data)
  };

  if (loadingCreate !== 'loading' && data && !error) return <Redirect to="/datasources" />

  return (
    <>
      <Row>
        <Col span="12" offset="6">
          <PageHeader title="New datasources" />
        </Col>
      </Row>
      {error && <Alert message="Error" description={error.toString()} type="error" showIcon />}
      <Row>
        <Col span="12" offset="6">
          <FormDatasource onSubmit={onSubmit} form={form} />
        </Col>
      </Row>
    </>
  );
};

export { DataSourceCreate };
