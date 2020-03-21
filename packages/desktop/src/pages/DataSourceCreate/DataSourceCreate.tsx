import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { TextField } from '../../components/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

const DataSourceCreate = () => {
  const classes = useStyles();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const form = new FormData(e.currentTarget);
    console.log(form.keys());
  };
  return (
    <div>
      <Typography variant="h4">New datasources</Typography>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Name"
          required
          name="name"
          placeholder='i.e. "Production DB (readonly)" or "Internal Admin API"'
        />
        <Divider orientation="vertical" />
        <TextField
          label="Host"
          placeholder="IP address or hostname of your database"
          required
          name="dbHost"
        />
        <TextField label="Port" value="27017" type="number" required name="dbPort" />
        <TextField label="Database name" required name="dbName" />
        <TextField label="Database username" required name="dbUsername" />
        <TextField label="Database password" type="password" required name="dbPassword" />
        <Button variant="contained" color="primary" type="submit">
          Create datasource
        </Button>
      </form>
    </div>
  );
};

export { DataSourceCreate };
