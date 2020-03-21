import * as React from 'react';
import Button from '@material-ui/core/Button';
// import { useParams } from 'react-router-dom';
import omit from 'lodash/omit';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';

import { CollapseMenu } from 'components/CollapseMenu';
import { TextField } from 'components/TextField';
import { deleteComponent, putComponent } from '../../../../../../interfaces/Components';
// import { useComponent } from '../../../../hooks/useComponent';
import { Item, componentContext } from '../../../../../../context/component';

const Container = styled.div`
  .MuiFormControl-root {
    width: 100%;
  }
`;

const EditComponent = () => {
  // const { id } = useParams<{ id: string }>();

  const { item, toggleItem } = React.useContext(componentContext);
  const [values, setValue] = React.useState<Item | undefined>(item);
  React.useEffect(() => {
    if (item) {
      setValue(item);
    }
  }, [item]);
  // const [, refetch] = useComponent(id);

  const [removeComponent] = deleteComponent();
  const [updateComponent] = putComponent();

  const handleDelete = React.useCallback(async () => {
    await removeComponent({ data: { id: item!._id } });
    toggleItem();
  }, [removeComponent, item, toggleItem]);

  const handleUpdateComponent = React.useCallback(
    () => updateComponent({ ...omit(values, ['_id', '__v']), id: values!._id }),
    [updateComponent, values]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      setValue({ ...values!, [name]: value });
    },
    [values]
  );

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  if (!item || !values) return null;

  return (
    <Container>
      <List component="nav">
        <ListItem>
          <TextField
            label="Name"
            value={values!.name}
            name="name"
            onChange={handleChange}
            onBlur={handleUpdateComponent}
          />
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </ListItem>
        <CollapseMenu label="Basic">
          <List component="div" disablePadding>
            <ListItem>
              <TextField label="Label" name="label" />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem>
              <TextField select label="Type" name="type">
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="password">Password</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="number">Number</MenuItem>
              </TextField>
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem>
              <TextField label="Default value" name="defaultValue" />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem>
              <TextField label="Placeholder text" name="defaultValue" />
            </ListItem>
          </List>
        </CollapseMenu>
      </List>
    </Container>
  );
};

export { EditComponent };
