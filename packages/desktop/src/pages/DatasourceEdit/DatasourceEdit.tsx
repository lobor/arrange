import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Form, PageHeader, Row, Col, Alert, Spin } from 'antd';

import { getDataSource } from 'interfaces/DataSources';
import { FormDatasource } from 'components/FormDatasource';

const DatasourceEdit = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const { status, data, error } = getDataSource(id);

  const onSubmit = async (data: {}) => {
    // insertDatasource(data)
  };
  React.useEffect(() => {
    if (data && data.data) {
      form.setFieldsValue(data.data)
    }
  }, [data])

  if (!data || status === 'loading') {
    return <Spin size="large" />;
  }
  if (error) {
    return <Alert message="Error" description={error.toString()} type="error" showIcon />;
  }
  return (
    <>
      <Row>
        <Col span="12" offset="6">
          <PageHeader title="New datasources" />
        </Col>
      </Row>
      <Row>
        <Col span="12" offset="6">
          <FormDatasource onSubmit={onSubmit} form={form} />
        </Col>
      </Row>
    </>
  );
};

export { DatasourceEdit };
