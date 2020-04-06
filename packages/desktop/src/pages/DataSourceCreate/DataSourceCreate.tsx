import * as React from 'react';
import { Alert, Button, Select, Row, Col, Form, PageHeader } from 'antd';
import { Redirect } from 'react-router-dom';
import { createDataSources } from 'interfaces/DataSources';

import { FormMongo } from './components/FormMongo';
import { FormRest } from './components/FormRest';

const layout = {
  labelCol: { span: 6 },
  layout: 'horizontal',
  wrapperCol: { span: 13 }
};

const DataSourceCreate = () => {
  const [formSelected, setFormSelected] = React.useState<string>();
  const [form] = Form.useForm();
  const [insertDatasource, { status: loadingCreate, error, data }] = createDataSources();
  const onSubmit = async (data: {}) => {
    insertDatasource(data)
  };

  const handleChangeRessource = (value: string) => {
    setFormSelected(value);
  };

  React.useEffect(() => {
    switch (formSelected) {
      case 'mongo':
        form.setFieldsValue({ dbPort: 27017 })
        break;
      case 'rest':
        form.setFieldsValue({ headers: [] })
        break;
      default:
        break;
    }
  }, [formSelected, form])

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
          <Form
            {...layout}
            layout="horizontal"
            onFinish={onSubmit}
            form={form}
          >
            <Form.Item label="Select ressources" name="type" rules={[{ required: true }]}>
              <Select onChange={handleChangeRessource}>
                <Select.Option value="rest">REST api</Select.Option>
                <Select.Option value="mongo">MongoDb</Select.Option>
              </Select>
            </Form.Item>
            {formSelected === 'mongo' && <FormMongo form={form} />}
            {formSelected === 'rest' && <FormRest />}
            <Form.Item>
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
