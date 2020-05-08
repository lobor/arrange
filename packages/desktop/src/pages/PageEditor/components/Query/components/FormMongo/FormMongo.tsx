import * as React from 'react';
import { Form, Select, Input } from 'antd';

import { DataSource } from 'interfaces/DataSources';
import { Method } from 'interfaces/Queries';

interface FormMongoProps {
  datasource: DataSource & { collections?: string[] };
}

const FormMongo: React.FC<FormMongoProps> = ({ datasource }) => {
  const [method, setMethod] = React.useState<Method>('find');

  const handleChangeType = (value: Method) => {
    setMethod(value);
  };
  return (
    <>
      <Form.Item label="Collections" name="collections">
        <Select>
          {(datasource.collections || []).map((value: string) => (
            <Select.Option key={value} value={value}>
              {value}
            </Select.Option>
          ))}
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
    </>
  );
};

export { FormMongo };
