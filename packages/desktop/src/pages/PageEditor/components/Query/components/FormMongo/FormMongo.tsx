import * as React from 'react';
import { Collapse, Form, Select, Input } from 'antd';

import { DataSource } from 'interfaces/DataSources';
import { Method } from 'interfaces/Queries';
import { FormInstance } from 'antd/lib/form';
import { Mentions } from 'components/Mentions';
import { AutoCompleteScope } from 'components/AutoCompleteScope';

interface FormMongoProps {
  datasource: DataSource & { collections?: string[] };
  form: FormInstance;
}

const FormMongo: React.FC<FormMongoProps> = ({ datasource, form }) => {
  const [method, setMethod] = React.useState<Method>('find');
  const handleChangeType = (value: Method) => {
    setMethod(value);
  };

  React.useEffect(() => {
    setMethod(form.getFieldValue('method'));
  }, [form.getFieldValue('method')]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Collapse defaultActiveKey={['basic']}>
      <Collapse.Panel header="Basic" key="basic">
        <Form.Item label="Collections" name="collections">
          <Select showSearch>
            {(datasource.collections || []).sort().map((value: string) => (
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
            <Mentions formItemProps={{ label: 'Query', name: 'query' }} />
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
            <Mentions formItemProps={{ label: 'Query', name: 'query' }} />
            <Form.Item label="Projection" name="projection">
              <Input />
            </Form.Item>
            <Form.Item label="Skip" name="skip">
              <Input />
            </Form.Item>
          </>
        )}
        {method === 'count' && <Mentions formItemProps={{ label: 'Query', name: 'query' }} />}
        {method === 'distinct' && (
          <>
            <Mentions formItemProps={{ label: 'Query', name: 'query' }} />
            <Form.Item label="Field" name="field" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Options" name="options" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </>
        )}
        {method === 'aggregate' && (
          <Mentions formItemProps={{ label: 'Aggregation', name: 'aggregation' }} />
        )}
        {method === 'insertOne' && <Mentions formItemProps={{ label: 'Insert', name: 'insert' }} />}
        {method === 'updateOne' && (
          <>
            <Mentions formItemProps={{ label: 'Query', name: 'query' }} />
            <Mentions formItemProps={{ label: 'Update', name: 'update' }} />
            <Form.Item label="Options" name="option">
              <Input />
            </Form.Item>
          </>
        )}
        {method === 'deleteOne' && <Mentions formItemProps={{ label: 'Query', name: 'query' }} />}
        {method === 'updateMany' && (
          <>
            <Mentions formItemProps={{ label: 'Query', name: 'query' }} />
            <Mentions formItemProps={{ label: 'Update', name: 'update' }} />
            <Form.Item label="Options" name="option">
              <Input />
            </Form.Item>
          </>
        )}
      </Collapse.Panel>
      <Collapse.Panel header="Advanced" key="advanced">
        <AutoCompleteScope formItemProps={{ label: 'Run query after', name: 'runAfter' }} />
      </Collapse.Panel>
    </Collapse>
  );
};

export { FormMongo };
