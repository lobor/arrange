import * as React from 'react';
import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';
import { useParams } from 'react-router-dom';
import {
  Popconfirm,
  Card,
  Row,
  Alert,
  Select,
  Button,
  Form,
  Menu,
  Input,
  Spin,
  PageHeader,
  Empty
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {
  Queries,
  QueriesRest,
  deleteQueries,
  updateQueries,
  createQueries,
  queries
} from 'interfaces/Queries';
import { DataSource, getDataSources } from 'interfaces/DataSources';
import { queryContext } from '../../context/query';
import { FormMongo } from './components/FormMongo';
import { FormRest } from './components/FormRest';

const Rezise = styled.div`
  background-color: #d9d9d9;
  height: 2px;
  position: absolute;
  cursor: row-resize;
  right: 0;
  left: 0;
  top: 0;
`;

const CardStyled = styled(Card)`
  height: 100%;
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const CardContentQuery = styled.div`
  border-right: 1px solid #dedede;
  width: 250px;
  display: flex;
  flex-direction: column;
`;

const CardContentSettingsQuery = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 13 }
};

const Query = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { open } = React.useContext(queryContext);
  const [datasourceSelected, setDatasourceSelected] = React.useState<DataSource>();
  const [querySelected, setQuerySelected] = React.useState<Queries>();

  const {
    data: dataSources,
    status: statusDataSources,
    error: errorDatasources
  } = getDataSources();
  const { data, status, error } = queries();
  const [createQuery] = createQueries();
  const [updateQuery] = updateQueries();
  const [deleteQuery, { status: statusDeleteQuery }] = deleteQueries();

  const handleNew = () => {
    createQuery({ name: 'query', page: id! });
  };

  const handleSubmit = (data: {}) => {
    querySelected && updateQuery({ ...(data as Queries), _id: querySelected._id });
  };
  const handleSelectQuery = React.useCallback(
    (query: Queries) => () => {
      setQuerySelected(query);
    },
    []
  );
  const handleDeleteQuery = async () => {
    querySelected && (await deleteQuery({ _id: querySelected._id }));
  };

  React.useEffect(() => {
    if (!querySelected && data && data.data[0] && dataSources) {
      setQuerySelected(data.data[0]);
      setDatasourceSelected(dataSources.data.find(({ _id }) => _id === data.data[0].datasource));
    }
    if (querySelected) {
      form.resetFields();
      form.setFieldsValue(querySelected);
    }
  }, [form, querySelected, data, dataSources]);

  if (!open) return null;

  const handleChangeDatasources = (value: string) => {
    if (dataSources && dataSources.data) {
      setDatasourceSelected(dataSources.data.find(({ _id }) => _id === value));
    }
  };

  const newButton =
    dataSources && dataSources.data && dataSources.data.length > 0
      ? [
          <Button key="new" type="link" size="small" onClick={handleNew} icon={<PlusOutlined />}>
            New
          </Button>
        ]
      : [];

  return (
    <ResizableBox
      className="resizeQuery"
      handle={<Rezise />}
      axis="y"
      resizeHandles={['n']}
      width={300}
      height={200}
      minConstraints={[300, 100]}
      maxConstraints={[500, 500]}
    >
      <CardStyled bordered={false} bodyStyle={{ display: 'flex', padding: 0, flex: 1 }}>
        <CardContentQuery>
          <PageHeader title="Query" extra={newButton} />
          {(status === 'loading' || statusDataSources === 'loading') && <Spin size="large" />}
          {status === 'error' && error && error.toString()}
          {statusDataSources === 'error' && errorDatasources && errorDatasources.toString()}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {data && data.data.length === 0 && <Empty />}
            {data && data.data.length > 0 && (
              <Menu mode="inline" defaultSelectedKeys={[data.data[0]._id]}>
                {data.data.map((query, i) => {
                  const { name } = query;
                  return (
                    <Menu.Item key={`${query._id}`} onClick={handleSelectQuery(query)}>
                      {name}
                    </Menu.Item>
                  );
                })}
              </Menu>
            )}
          </div>
        </CardContentQuery>
        <CardContentSettingsQuery>
          <Row>
            <PageHeader title="Settings" />
          </Row>
          <Row style={{ display: 'flex', flex: 1, overflow: 'auto' }}>
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
              <Form
                {...layout}
                form={form}
                layout="horizontal"
                style={{ width: '100%' }}
                onFinish={handleSubmit}
              >
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Datasource" name="datasource" rules={[{ required: true }]}>
                  <Select onChange={handleChangeDatasources}>
                    {dataSources &&
                      dataSources.data.map(({ _id, name }) => (
                        <Select.Option key={_id} value={_id}>
                          {name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
                {datasourceSelected && datasourceSelected.type === 'mongo' && <FormMongo />}
                {datasourceSelected && datasourceSelected.type === 'rest' && (
                  <FormRest url={((querySelected as unknown) as QueriesRest).url} />
                )}

                <Form.Item wrapperCol={{ span: 13, offset: 6 }} style={{ textAlign: 'right' }}>
                  <Popconfirm
                    title="Are you sure delete this query?"
                    onConfirm={handleDeleteQuery}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger loading={statusDeleteQuery === 'loading'}>
                      Delete
                    </Button>
                  </Popconfirm>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Row>
        </CardContentSettingsQuery>
      </CardStyled>
    </ResizableBox>
  );
};

export { Query };
