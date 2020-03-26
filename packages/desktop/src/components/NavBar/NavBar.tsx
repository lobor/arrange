import * as React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { navBarContext } from '../../pages/PageEditor/context/navBar';
import { queryContext } from '../../pages/PageEditor/context/query';
import { componentContext } from '../../pages/PageEditor/context/component';
import { scopeContext } from '../../pages/PageEditor/context/scope';

const NavBar = () => {
  const { edit } = React.useContext(navBarContext);
  const { toggle: toggleComponent } = React.useContext(componentContext);
  const { toggle: toggleQuery } = React.useContext(queryContext);
  const { toggle: toggleScope } = React.useContext(scopeContext);
  return (
    <Layout.Header>
      <Menu theme="dark" mode="horizontal" selectable={!edit} defaultSelectedKeys={['1']}>
        {!edit && [
          <Menu.Item key="1">
            <Link to="/pages">Pages</Link>
          </Menu.Item>,
          <Menu.Item key="2">
            <Link to="/datasources">Data sources</Link>
          </Menu.Item>
        ]}
        {edit && [
          <Menu.Item onClick={toggleComponent}>
            <Link to="/pages">
              <ArrowLeftOutlined />
            </Link>
          </Menu.Item>,
          <Menu.Item onClick={toggleComponent}>Components</Menu.Item>,
          <Menu.Item onClick={toggleQuery}>Query</Menu.Item>,
          <Menu.Item onClick={toggleScope}>Scope</Menu.Item>
        ]}
      </Menu>
    </Layout.Header>
  );
};

export { NavBar };
