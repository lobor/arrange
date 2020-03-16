import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { useAxios } from '../../hooks/useAxios'

const useStyles = makeStyles(theme => ({
  title: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const Pages = () => {
  const history = useHistory();

  const classes = useStyles()

  const [open, setOpen] = React.useState<boolean>(false);

  const [name, setName] = React.useState<string>();

  const [{ data, loading, error }] = useAxios<{ _id: string, name: string }[]>('pages')
  const [
    { loading: putLoading, error: putError },
    executePut
  ] = useAxios<{ _id: string }>({ url: 'createPage', method: 'POST' }, { manual: true })

  const handleClickOpen = React.useCallback(() => setOpen(true), [setOpen])
  const handleClose = React.useCallback(() => setOpen(false), [setOpen])
  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value), [setName])
  const validate = React.useCallback(async () => {
    const { data: { _id } } = await executePut({ data: { name } })
    history.push(`/pages/editor/${_id}`);
  }, [name])

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <Alert severity="error">{error.toString()}</Alert>
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new page</DialogTitle>
        {putLoading && <CircularProgress />}
        {!putLoading && <>
          <DialogContent>
            {putError && <Alert severity="error">{putError.toString()}</Alert>}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="App name"
              type="email"
              value={name}
              onChange={onChange}
              required
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={validate} variant="contained" color="primary">
              Create
            </Button>
          </DialogActions>
          </>
        }
      </Dialog>
      <Typography className={classes.title} variant="h4">
        <div>
          Pages
        </div>
        <Button onClick={handleClickOpen} variant="contained" color="primary">
          New pages
        </Button>
      </Typography>
      {data.length === 0 && <Alert severity="warning">You should pages</Alert>}
      {data.length > 0 && (
        <List component="nav" aria-label="secondary mailbox folders">
          {data.map(({ _id, name }) => (
            <ListItem button component={Link} key={_id} to={`/datasources/${_id}`}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  )
}

export { Pages}