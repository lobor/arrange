import * as React from 'react';
import styled from 'styled-components';
import { DataSource, getDataSources } from 'interfaces/DataSources';
import { Callbacks } from 'rc-field-form/lib/interface';
import { FormInstance } from 'antd/lib/form';
import {
  Form as FormAntd,
  PageHeader,
  Button,
  Popconfirm,
  Select,
  Alert,
  Switch,
  Input
} from 'antd';


import { Queries, QueriesRest, deleteQueries } from 'interfaces/Queries';

import { FormMongo } from '../FormMongo';
import { FormRest } from '../FormRest';

const CardContentSettingsQuery = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ContainerForm = styled.div`
  flex: 1;
  overflow: auto;
`;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 13 }
};

interface FormProps {
  form: FormInstance;
  onSubmit: Callbacks['onFinish'];
  querySelected?: Queries;
}

const Form: React.FC<FormProps> = ({ onSubmit, querySelected, form }) => {
  const { data: dataSources } = getDataSources();
  const [deleteQuery] = deleteQueries();

  const [datasourceSelected, setDatasourceSelected] = React.useState<DataSource>();

  const handleDeleteQuery = async () => {
    querySelected && (await deleteQuery({ _id: querySelected._id }));
  };

  const handleChange = (value: string) => {
    setDatasourceSelected(dataSources!.data.find(({ _id }) => _id === value));
  };

  React.useEffect(() => {
    if (querySelected) {
      form.setFieldsValue(querySelected);
    }
  }, [querySelected]);

  React.useEffect(() => {
    if (querySelected && dataSources) {
      setDatasourceSelected(dataSources.data.find(({ _id }) => _id === querySelected.datasource));
    }
  }, [querySelected, dataSources]);
  return (
    <CardContentSettingsQuery>
      <FormAntd
        {...layout}
        form={form}
        layout="horizontal"
        style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
        onFinish={onSubmit}
      >
        <PageHeader
          title="Settings"
          extra={
            querySelected
              ? [
                  <FormAntd.Item
                    key="onLoad"
                    label="Call on load"
                    name="onLoad"
                    labelCol={{ span: 19 }}
                    wrapperCol={{ span: 5 }}
                    valuePropName="checked"
                    style={{ display: 'inline-flex', margin: 0, verticalAlign: 'baseline' }}
                  >
                    <Switch size="small" />
                  </FormAntd.Item>,
                  <Popconfirm
                    title="Are you sure delete this query?"
                    onConfirm={handleDeleteQuery}
                    okText="Yes"
                    cancelText="No"
                    key="delete"
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>,
                  <Button type="primary" htmlType="submit" key="save">
                    Save
                  </Button>
                ]
              : []
          }
        />
        {!querySelected && (
          <Alert
            message="Info"
            description="You should select one query for modify it"
            type="info"
            showIcon
            style={{ width: '100%' }}
          />
        )}
        {querySelected && (
          <ContainerForm>
            <FormAntd.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </FormAntd.Item>
            <FormAntd.Item label="Datasource" name="datasource" rules={[{ required: true }]}>
              <Select showSearch onChange={handleChange}>
                {dataSources &&
                  dataSources.data.map(({ _id, name }) => (
                    <Select.Option key={_id} value={_id}>
                      {name}
                    </Select.Option>
                  ))}
              </Select>
            </FormAntd.Item>
            {datasourceSelected && datasourceSelected.type === 'mongo' && (
              <FormMongo datasource={datasourceSelected} form={form} />
            )}
            {datasourceSelected && datasourceSelected.type === 'rest' && (
              <FormRest url={((querySelected as unknown) as QueriesRest).url} />
            )}
          </ContainerForm>
        )}
      </FormAntd>
    </CardContentSettingsQuery>
  );
};

export { Form };
