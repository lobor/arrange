import * as React from 'react';
import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';
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
  Method,
  Queries,
  deleteQueries,
  updateQueries,
  createQueries,
  queries
} from 'interfaces/Queries';
import { getDataSources } from 'interfaces/DataSources';
import { queryContext } from '../../context/query';

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
  labelCol: { offset: 4, span: 2 },
  wrapperCol: { span: 13 }
};

const Query = () => {
  const { open } = React.useContext(queryContext);
  const [method, setMethod] = React.useState<Method>('find');
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
    createQuery({ name: 'query' });
  };

  const handleChangeType = (value: Method) => {
    setMethod(value);
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
    if (!querySelected && data && data.data[0]) {
      setQuerySelected(data.data[0]);
    }
  }, [querySelected, data]);

  if (!open) return null;

  return (
    <ResizableBox
      className="resizeQuery"
      handle={<Rezise />}
      axis="y"
      resizeHandles={['n']}
      width={300}
      height={200}
      minConstraints={[300, 100]}
      maxConstraints={[500, 300]}
    >
      <CardStyled bordered={false} bodyStyle={{ display: 'flex', padding: 0, flex: 1 }}>
        <CardContentQuery>
          <PageHeader
            title="Query"
            extra={[
              <Button
                key="new"
                type="link"
                size="small"
                onClick={handleNew}
                icon={<PlusOutlined />}
              >
                New
              </Button>
            ]}
          />
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
                layout="horizontal"
                initialValues={querySelected}
                style={{ width: '100%' }}
                onFinish={handleSubmit}
              >
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label="Datasources" name="datasources">
                  <Select>
                    {dataSources &&
                      dataSources.data.map(({ _id, name }) => (
                        <Select.Option key={_id} value={_id}>
                          {name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Collections" name="collections">
                  <Select>
                    <Select.Option value={'name'}>name</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Action type" name="method">
                  <Select onChange={handleChangeType}>
                    <Select.Option value="find">find</Select.Option>
                    <Select.Option value="findOne">findOne</Select.Option>
                    <Select.Option value="count">count</Select.Option>
                    <Select.Option value="distinct">distinct</Select.Option>
                    <Select.Option value="aggregate">aggregate</Select.Option>
                    <Select.Option value="insertOne">insertOne</Select.Option>
                    <Select.Option value="updateOne">updateOne</Select.Option>
                    <Select.Option value="deleteOne">deleteOne</Select.Option>
                    <Select.Option value="updateMany">updateMany</Select.Option>
                  </Select>
                </Form.Item>
                {method === 'find' && (
                  <>
                    <Form.Item label="Query" name="query">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Projection" name="projection">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Sort by" name="sortBy">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Limit" name="limit">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Skip" name="skip">
                      <Input />
                    </Form.Item>
                  </>
                )}
                {method === 'findOne' && (
                  <>
                    <Form.Item label="Query" name="query" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Projection" name="projection">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Skip" name="skip">
                      <Input />
                    </Form.Item>
                  </>
                )}
                {method === 'count' && (
                  <Form.Item label="Query" name="query" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                )}
                {method === 'distinct' && (
                  <>
                    <Form.Item label="Query" name="query" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Field" name="field" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Options" name="options" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                  </>
                )}
                {method === 'aggregate' && (
                  <Form.Item label="Aggregation" name="aggregation" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                )}
                {method === 'insertOne' && (
                  <Form.Item label="Insert" name="insert" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                )}
                {method === 'updateOne' && (
                  <>
                    <Form.Item label="Query" name="query" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Update" name="update" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Options" name="option">
                      <Input />
                    </Form.Item>
                  </>
                )}
                {method === 'deleteOne' && (
                  <Form.Item label="Query" name="query" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                )}
                {method === 'updateMany' && (
                  <>
                    <Form.Item label="Query" name="query" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Update" name="update" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Options" name="option">
                      <Input />
                    </Form.Item>
                  </>
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
