import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import omit from 'lodash/omit';
import { useHistory } from 'react-router-dom';

import { TextField } from '../../components/TextField';
import { DataSource, createDataSources, checkConnexion } from '../../interfaces/DataSources';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

const DataSourceCreate = () => {
  const history = useHistory()
  const { register, handleSubmit, getValues } = useForm<Omit<DataSource, '_id'>, {}>();
  const [insertDatasource] = createDataSources();
  const onSubmit = async (data: {}) => {
    await insertDatasource(data);
    history.push('/datastores')
  };
  const [connectionCheck] = checkConnexion();
  const onTest = () => connectionCheck(omit(getValues(), ['name']));
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h4">New datasources</Typography>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          required
          name="name"
          inputProps={{ ref: register({ required: true }) }}
          placeholder='i.e. "Production DB (readonly)" or "Internal Admin API"'
        />
        <Divider orientation="vertical" />
        <TextField
          label="Host"
          placeholder="IP address or hostname of your database"
          inputProps={{ ref: register({ required: true }) }}
          required
          name="dbHost"
        />
        <TextField
          label="Port"
          value="27017"
          type="number"
          required
          name="dbPort"
          inputProps={{ ref: register({ required: true }) }}
        />
        <TextField
          label="Database name"
          required
          name="dbName"
          inputProps={{ ref: register({ required: true }) }}
        />
        <TextField label="Database username" name="dbUsername" inputProps={{ ref: register() }} />
        <TextField
          label="Database password"
          type="password"
          name="dbPassword"
          inputProps={{ ref: register() }}
        />
        <Button variant="contained" onClick={onTest}>
          Test connexion
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Create datasource
        </Button>
      </form>
    </div>
  );
};

export { DataSourceCreate };
