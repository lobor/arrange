import * as React from 'react';
import styled from 'styled-components';
import { Card, Row, Alert, Select, Button, Form, Menu, Input, Spin, PageHeader } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { Method, Queries, createQueries, queries } from 'interfaces/Queries';
import { getDataSources } from 'interfaces/DataSources';
import { queryContext } from '../../context/query';

const CardStyled = styled(Card)`
  height: 200px;
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

const CardContentStyled = styled.div`
  overflow: auto;
  max-height: 100%;
`;

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

  const handleNew = () => {
    createQuery({ name: 'query' });
  };

  const handleChangeType = (value: Method) => {
    setMethod(value);
  };

  const handleSelectQuery = (query: Queries) => () => setQuerySelected(query);

  React.useEffect(() => {
    if (!querySelected && data && data.data[0]) {
      setQuerySelected(data.data[0]);
    }
  }, [querySelected, data]);

  if (!open) return null;

  return (
    <CardStyled bordered={false} bodyStyle={{ display: 'flex', padding: 0, flex: 1 }}>
      <CardContentQuery>
        <PageHeader
          title="Query"
          extra={[
            <Button type="link" size="small" onClick={handleNew} icon={<PlusOutlined />}>
              New
            </Button>
          ]}
        />
        {(status === 'loading' || statusDataSources === 'loading') && <Spin size="large" />}
        {status === 'error' && error && error.toString()}
        {statusDataSources === 'error' && errorDatasources && errorDatasources.toString()}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {data && (
            <Menu mode="inline" defaultSelectedKeys={['0']}>
              {data.data.map((query, i) => {
                const { name } = query;
                return (
                  <Menu.Item key={`${name}-${i}`} onClick={handleSelectQuery(query)}>
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
            />
          )}
          {querySelected && (
            <Form layout="horizontal" initialValues={querySelected} style={{ width: '100%' }}>
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Datasources" name="datasources" rules={[{ required: true }]}>
                <Select>
                  {dataSources &&
                    dataSources.data.map(({ _id, name }) => (
                      <Select.Option key={_id} value={_id}>
                        {name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item label="Collections" name="collections" rules={[{ required: true }]}>
                <Select>
                  <Select.Option value={'name'}>name</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Action type" name="method" rules={[{ required: true }]}>
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
                  <Form.Item label="Query" name="query" rules={[{ required: true }]}>
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
            </Form>
          )}
        </Row>
      </CardContentSettingsQuery>
    </CardStyled>
  );
};

export { Query };
