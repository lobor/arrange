import './themes';
import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import { NavBar } from './components/NavBar';
import { DataSources } from './pages/DataSources';
import { DataSourceCreate } from './pages/DataSourceCreate';
import { Pages } from './pages/Pages';
import { PageEditor } from './pages/PageEditor';
import { QueryProvider } from './pages/PageEditor/context/query';
import { ComponentProvider } from './pages/PageEditor/context/component';
import { NavBarProvider } from './pages/PageEditor/context/navBar';
import { ScopeProvider } from './pages/PageEditor/context/scope';

const { Sider, Content, Footer } = Layout;

function App() {
  return (
    <ComponentProvider>
      <QueryProvider>
        <NavBarProvider>
          <ScopeProvider>
            {React.useMemo(
              () => (
                <Router>
                  <Layout>
                    <NavBar />
                    {/* <Sider>left sidebar</Sider> */}
                    <Content>
                      <Switch>
                        <Route exact path="/pages">
                          <Pages />
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
                      </Switch>
                    </Content>
                    {/* <Sider>right sidebar</Sider> */}
                  </Layout>
                </Router>
              ),
              []
            )}
          </ScopeProvider>
        </NavBarProvider>
      </QueryProvider>
    </ComponentProvider>
  );
}

export default App;
