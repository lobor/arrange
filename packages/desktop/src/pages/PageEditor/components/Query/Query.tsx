import * as React from 'react';
import styled from 'styled-components';
import { ResizableBox } from 'react-resizable';
import { useParams } from 'react-router-dom';
import { Card, Button, Form as FormAntd, Menu, Spin, PageHeader, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { Queries, updateQueries, createQueries, queries } from 'interfaces/Queries';
import { getDataSources } from 'interfaces/DataSources';
import { queryContext } from '../../context/query';

import { Form } from './components/Form';

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

const Query = () => {
  const [form] = FormAntd.useForm();
  const { id } = useParams();
  const { open } = React.useContext(queryContext);
  const [querySelected, setQuerySelected] = React.useState<Queries>();

  const {
    data: dataSources,
    status: statusDataSources,
    error: errorDatasources
  } = getDataSources();
  const { data, status, error } = queries();
  const [createQuery] = createQueries();
  const [updateQuery] = updateQueries();

  const handleNew = () => {
    createQuery({ name: 'query', page: id! });
  };

  const handleSubmit = (data: {}) => {
    updateQuery({ ...(data as Queries), _id: querySelected!._id });
  };
  const handleSelectQuery = React.useCallback(
    (query: Queries) => () => {
      setQuerySelected(query);
      form.resetFields();
      form.setFieldsValue(query);
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  React.useEffect(() => {
    if (!querySelected && data && data.data) {
      setQuerySelected(data.data[0]);
    }
  }, [querySelected, data]);

  if (!open) return null;

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
      height={300}
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
        <Form onSubmit={handleSubmit} form={form} querySelected={querySelected} />
      </CardStyled>
    </ResizableBox>
  );
};

export { Query };
