import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { NavBar } from './components/NavBar'
import { DataSources } from './pages/DataSources'
import { DataSourceCreate } from './pages/DataSourceCreate'
import { Pages } from './pages/Pages'
import { PageEditor } from './pages/PageEditor'

const styleDiv = {
  margin: 'auto',
  maxWidth: '1280px'
}
function App() {
  return (
    <Router>
      <NavBar />
      <div style={styleDiv}>
        <Switch>
          <Route exact path="/pages">
            <Pages />
          </Route>
          <Route exact path="/pages/editor/:id">
            <PageEditor />
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
  );
}

export default App;
