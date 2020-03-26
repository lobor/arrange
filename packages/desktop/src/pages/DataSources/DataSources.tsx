import * as React from 'react';
import { Link } from 'react-router-dom';
import { List, Button, PageHeader, Row, Col, Alert, Empty, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { getDataSources } from 'interfaces/DataSources';

const DataSources = () => {
  const { status, data, error } = getDataSources();

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
          <PageHeader
            title="Data sources"
            extra={[
              <Button type="link" icon={<PlusOutlined />}>
                <Link to={`/datasources/create`}>New data sources</Link>
              </Button>
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Col span="12" offset="6">
          {data.data.length === 0 && (
            <>
              <Alert
                message="Warning"
                description="You should create datasources"
                type="warning"
                showIcon
              />
              <Empty />
            </>
          )}
          {data.data.length > 0 && (
            <List
              bordered
              dataSource={data.data}
              renderItem={({ _id, name }) => (
                <List.Item>
                  <Link to={`/datasources/${_id}`}>{name}</Link>
                </List.Item>
              )}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export { DataSources };
