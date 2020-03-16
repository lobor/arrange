import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams } from 'react-router-dom'

import { useAxios } from '../../hooks/useAxios'

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    position: 'relative',
  },
}));

const PageEditor = () => {
  const classes = useStyles();
  
  const { id } = useParams<{ id: string }>()
  const [{ data, loading, error }] = useAxios<{ _id: string }[]>({
    url: 'getPage',
    params: { id }
  })

  const [openComponents, setOpenComponents] = React.useState<boolean>(false);
  const [openQuery, setOpenQuery] = React.useState<boolean>(false);

  const toggleComponents = React.useCallback(() => {
    setOpenComponents(!openComponents);
  }, [openComponents]);

  const toggleQuery = React.useCallback(() => {
    setOpenQuery(!openQuery);
  }, [openQuery]);

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <Alert severity="error">{error.toString()}</Alert>
  }

  if (!data) {
    return <Alert severity="warning">Not found page</Alert>
  }

  const styleComponents = { display: openComponents ? 'block' : 'none', width: '15%' }
  const styleQuery = { display: openQuery ? 'block' : 'none', height: '15%' }

  return (
    <div style={{ display: 'flex', position: 'absolute', left: 0, right: 0, bottom: 0, top: '64px', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <Card style={styleComponents}>
          components
        </Card>
        <Card style={{ flex: 1 }}>
          <Button onClick={toggleComponents}>Components</Button>
          <Button onClick={toggleQuery}>Query</Button>
        </Card>
      </div>
      <Card style={styleQuery}>
        query
      </Card>
    </div>
  )
}

export { PageEditor}