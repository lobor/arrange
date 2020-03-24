import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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

const styleDiv = {
  margin: 'auto',
  maxWidth: '1280px'
};

const theme = createMuiTheme({
  props: {
    MuiButton: {
      size: 'small'
    },
    MuiTextField: {
      size: 'small'
    }
  },
  overrides: {
    MuiAppBar: {},
    MuiCardHeader: {
      action: {
        marginTop: '0'
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
