import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Typography } from 'antd';

const Page404 = () => {
  return (
    <Row>
      <Col offset="6" span="6">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg" alt="404" />
      </Col>
      <Col span="12">
        <Typography.Title>404</Typography.Title>
        <Link to="/">
          <Button type="primary">Back to home</Button>
        </Link>
      </Col>
    </Row>
  );
};

export { Page404 };
