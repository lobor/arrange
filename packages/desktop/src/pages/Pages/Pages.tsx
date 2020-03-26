import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Popconfirm,
  List,
  Empty,
  Alert,
  Modal,
  Form,
  Input,
  Row,
  Col,
  PageHeader,
  Button,
  Spin
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import { pages, createPage, deletePage } from 'interfaces/Pages';

const Pages = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const [name, setName] = React.useState<string>();

  const { status, data, error } = pages();
  const [insertPage, { status: statusCreate, error: errorCreate }] = createPage();
  const [onDeletePage] = deletePage();

  const handleClickOpen = React.useCallback(() => setOpen(true), [setOpen]);
  const handleClose = React.useCallback(() => setOpen(false), [setOpen]);
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value),
    [setName]
  );
  const handleDelete = (id: string) => () => {
    onDeletePage({ id });
  };
  const validate = React.useCallback(async () => {
    try {
      await insertPage({ name: name! });
      handleClose();
    } catch (e) {
      console.log(e);
    }
  }, [insertPage, name, handleClose]);

  if (error && status === 'error') {
    return <Alert message="Error" description={error.message} type="error" showIcon />;
  }

  if (!data || status === 'loading') {
    return <Spin size="large" />;
  }

  return (
    <>
      <Modal
        title="Create new page"
        visible={open}
        onOk={validate}
        onCancel={handleClose}
        confirmLoading={statusCreate === 'loading'}
      >
        <Form>
          {errorCreate && (
            <Alert message="Error" description={errorCreate.toString()} type="error" showIcon />
          )}
          <Form.Item
            label="App name"
            name="name"
            rules={[{ required: true, message: 'Please input page name' }]}
          >
            <Input autoFocus onChange={onChange} />
          </Form.Item>
        </Form>
      </Modal>
      <Row>
        <Col span="12" offset="6">
          <PageHeader
            title="Pages"
            extra={[
              <Button onClick={handleClickOpen} type="link" icon={<PlusOutlined />}>
                New pages
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
                description="You should create pages"
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
                <List.Item
                  actions={[
                    <Popconfirm
                      title="Are you sure delete this page?"
                      onConfirm={handleDelete(_id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="link" icon={<DeleteOutlined />}>
                        Delete
                      </Button>
                    </Popconfirm>
                  ]}
                >
                  <Link to={`/pages/editor/${_id}`}>{name}</Link>
                </List.Item>
              )}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export { Pages };
