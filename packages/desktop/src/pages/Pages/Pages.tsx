import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';

import { pages, createPage, deletePage } from 'interfaces/Pages';

const useStyles = makeStyles(theme => ({
  title: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const Pages = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState<boolean>(false);

  const [name, setName] = React.useState<string>();

  const { status, data, error } = pages();
  const [insertPage, { status: statusCreate, error: errorCreate }] = createPage();
  const [onDeletePage] = deletePage();

  const handleClickOpen = React.useCallback(() => setOpen(true), [setOpen]);
  const handleClose = React.useCallback(() => setOpen(false), [setOpen]);
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value),
    [setName]
  );
  const handleDelete = (id: string) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onDeletePage({ id });
  };
  const validate = React.useCallback(async () => {
    try {
      await insertPage({ name: name! });
      handleClose();
    } catch (e) {
      console.log(e);
    }
  }, [insertPage, name, handleClose]);

  if (error && status === 'error') {
    return <Alert severity="error">{error.message}</Alert>;
  }

  if (!data || status === 'loading') {
    return <CircularProgress />;
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new page</DialogTitle>
        {statusCreate === 'loading' ? (
          <CircularProgress />
        ) : (
          <>
            <DialogContent>
              {errorCreate && <Alert severity="error">{errorCreate.toString()}</Alert>}
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
        )}
      </Dialog>
      <Typography className={classes.title} variant="h4">
        <div>Pages</div>
        <Button onClick={handleClickOpen} variant="contained" color="primary">
          New pages
        </Button>
      </Typography>
      {data.data.length === 0 && <Alert severity="warning">You should pages</Alert>}
      {data.data.length > 0 && (
        <List component="nav" aria-label="secondary mailbox folders">
          {data.data.map(({ _id, name }) => (
            <ListItem button component={Link} key={_id} to={`/pages/editor/${_id}`}>
              <ListItemText primary={name} />
              <ListItemIcon>
                <IconButton onClick={handleDelete(_id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export { Pages };
