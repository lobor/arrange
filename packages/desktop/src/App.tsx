import './themes';
import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import { NavBar } from 'components/NavBar';
import { Page404 } from './pages/404';
import { Home } from './pages/Home';
import { DataSources } from './pages/DataSources';
import { DataSourceCreate } from './pages/DataSourceCreate';
import { Pages } from './pages/Pages';
import { PageEditor } from './pages/PageEditor';
import { QueryProvider } from './pages/PageEditor/context/query';
import { ComponentProvider } from './pages/PageEditor/context/component';
import { NavBarProvider } from './pages/PageEditor/context/navBar';
import { ScopeProvider } from './pages/PageEditor/context/scope';
import { DragProvider } from './pages/PageEditor/context/drag';
import { PageView } from './pages/PageView';

const { Content } = Layout;

function App() {
  return (
    <ComponentProvider>
      <QueryProvider>
        <DragProvider>
          <NavBarProvider>
            <ScopeProvider>
              <Router>
                <Layout>
                  <NavBar />
                  {/* <Sider>left sidebar</Sider> */}
                  <Content>
                    <Switch>
                      <Route exact path="/pages">
                        <Pages />
                      </Route>
                      <Route exact path="/pages/:id">
                        <PageView />
                      </Route>
                      <Route exact path="/pages/editor/:id">
                        <DndProvider backend={Backend}>
                          <PageEditor />
                        </DndProvider>
                      </Route>
                      <Route exact path="/datasources">
                        <DataSources />
                      </Route>
                      <Route exact path="/datasources/create">
                        <DataSourceCreate />
                      </Route>
                      <Route exact path="/">
                        <Home />
                      </Route>
                      <Route path="*">
                        <Page404 />
                      </Route>
                    </Switch>
                  </Content>
                  {/* <Sider>right sidebar</Sider> */}
                </Layout>
              </Router>
            </ScopeProvider>
          </NavBarProvider>
        </DragProvider>
      </QueryProvider>
    </ComponentProvider>
  );
}

export default App;
