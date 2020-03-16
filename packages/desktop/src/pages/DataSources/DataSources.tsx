import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

import { useAxios } from '../../hooks/useAxios'

const useStyles = makeStyles(theme => ({
  title: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const DataSources = () => {
  const classes = useStyles()
  const [{ data, loading, error }] = useAxios<{ _id: string }[]>('listDatasource')
  if (loading) {
    return <CircularProgress />
  }
  if (error) {
    return <Alert severity="error">{error.toString()}</Alert>
  }
  return (
    <>
      <Typography className={classes.title} variant="h4">
        <div>
          Data sources
        </div>
        <Button component={Link} to={`/datasources/create`} variant="contained" color="primary">
          New data sources
        </Button>
      </Typography>
      {data.length === 0 && <Alert severity="warning">You should create datasources</Alert>}
      {data.length > 0 && (
        <List component="nav" aria-label="secondary mailbox folders">
          {data.map(({ _id }) => (
            <ListItem button component={Link} key={_id} to={`/datasources/${_id}`}>
              <ListItemText primary="Trash" />
            </ListItem>
          ))}
        </List>
      )}
    </>
  )
}

export { DataSources}