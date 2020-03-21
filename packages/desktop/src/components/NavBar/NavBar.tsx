import * as React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { navBarContext } from '../../context/navBar';
import { queryContext } from '../../context/query';
import { componentContext } from '../../context/component';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const NavBar = () => {
  const { edit } = React.useContext(navBarContext);
  const { toggle: toggleComponent } = React.useContext(componentContext);
  const { toggle: toggleQuery } = React.useContext(queryContext);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {!edit && (
            <>
              <Button component={Link} color="inherit" to="/pages">
                Pages
              </Button>
              <Button component={Link} color="inherit" to="/datasources">
                Data sources
              </Button>
            </>
          )}
          {edit && (
            <>
              <Button onClick={toggleComponent}>Components</Button>
              <Button onClick={toggleQuery}>Query</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export { NavBar };
