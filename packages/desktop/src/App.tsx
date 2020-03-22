import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import { NavBar } from './components/NavBar';
import { DataSources } from './pages/DataSources';
import { DataSourceCreate } from './pages/DataSourceCreate';
import { Pages } from './pages/Pages';
import { PageEditor } from './pages/PageEditor';
import { QueryProvider } from './context/query';
import { ComponentProvider } from './context/component';
import { NavBarProvider } from './context/navBar';
import { ScopeProvider } from './context/scope';

const styleDiv = {
  margin: 'auto',
  maxWidth: '1280px'
};

function App() {
  return (
    <ComponentProvider>
      <QueryProvider>
        <NavBarProvider>
          <ScopeProvider>
            {React.useMemo(
              () => (
                <Router>
                  <NavBar />
                  <div style={styleDiv}>
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
                  </div>
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
