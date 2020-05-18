import * as React from 'react';
import { Alert, Button, Select, Row, Col, Form, PageHeader } from 'antd';
import { FormProps, FormInstance } from 'antd/lib/form';
import { Callbacks } from 'rc-field-form/lib/interface';

import { FormMongo } from './components/FormMongo';
import { FormRest } from './components/FormRest';

const layout = {
  labelCol: { span: 6 },
  layout: 'horizontal',
  wrapperCol: { span: 13 }
};

interface FormDatasourceProps {
  form: FormInstance;
  onSubmit: Callbacks['onFinish'];
}

const FormDatasource: React.FC<FormDatasourceProps> = ({ form, onSubmit }) => {
  const [formSelected, setFormSelected] = React.useState<string>();
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
  React.useEffect(() => {
    if (!formSelected && form.getFieldValue('type')) {
      setFormSelected(form.getFieldValue('type'))
      console.log('set')
    }
  }, [formSelected, form.getFieldValue('type')])
  return (
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
          style={{ marginLeft: 8 }}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

export { FormDatasource }