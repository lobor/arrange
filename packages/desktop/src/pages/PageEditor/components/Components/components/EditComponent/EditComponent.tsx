import * as React from 'react';
import Button from '@material-ui/core/Button';
import omit from 'lodash/omit';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { CollapseMenu } from '../../../../../../components/CollapseMenu';
import { TextField } from '../../../../../../components/TextField';
import {
  Component as Item,
  deleteComponent,
  putComponent
} from '../../../../../../interfaces/Components';
import { componentContext } from '../../../../../../context/component';

const Container = styled.div`
  .MuiFormControl-root {
    width: 100%;
  }
`;

const EditComponent = () => {
  const { item, toggleItem } = React.useContext(componentContext);
  const [values, setValue] = React.useState<Item | undefined>(item);

  const [removeComponent] = deleteComponent();
  const [updateComponent] = putComponent();

  const handleDelete = React.useCallback(async () => {
    await removeComponent({ data: { id: item!._id } });
    toggleItem();
  }, [removeComponent, item, toggleItem]);

  const handleUpdateComponent = React.useCallback(
    () => updateComponent({ ...omit(values, ['_id', '__v', 'page']), id: values!._id }),
    [updateComponent, values]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.currentTarget.name ? e.currentTarget.name : 'inputType';
      const value = e.currentTarget.value
        ? e.currentTarget.value
        : e.currentTarget.getAttribute('data-value');
      setValue({ ...values!, [name]: value || '' });
    },
    [values]
  );

  const handleChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...values!, [e.currentTarget.name]: !e.currentTarget.checked });
    handleUpdateComponent();
  };

  React.useEffect(() => {
    if (item) {
      setValue(item);
    }
  }, [item]);

  if (!values || !item) return null;

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
              <TextField
                label="Label"
                value={values.label}
                name="label"
                onChange={handleChange}
                onBlur={handleUpdateComponent}
              />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem>
              <TextField
                select
                label="Type"
                name="inputType"
                value={values.inputType}
                onChange={handleChange}
                onBlur={handleUpdateComponent}
              >
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
              <TextField
                label="Default value"
                name="defaultValue"
                value={values.defaultValue || ''}
                onChange={handleChange}
                onBlur={handleUpdateComponent}
              />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem>
              <TextField
                label="Placeholder text"
                name="placeholder"
                value={values.placeholder}
                onChange={handleChange}
                onBlur={handleUpdateComponent}
              />
            </ListItem>
          </List>
        </CollapseMenu>

        <CollapseMenu label="Validation">
          {/* <List component="div" disablePadding>
            <ListItem>
              <FormControlLabel
                control={<Switch name="validation" color="primary" />}
                label="Enable validation type"
              />
            </ListItem>
          </List> */}
          <List component="div" disablePadding>
            <ListItem>
              <FormControlLabel
                control={
                  <Switch
                    onChange={handleChangeChecked}
                    checked={!values.required}
                    name="required"
                    color="primary"
                  />
                }
                label="Required field"
              />
            </ListItem>
          </List>
        </CollapseMenu>

        <CollapseMenu label="Advanced">
          <List component="div" disablePadding>
            <ListItem>
              <TextField
                label="On blur run (query)"
                name="onBlur"
                onChange={handleChange}
                onBlur={handleUpdateComponent}
              />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem>
              <TextField
                label="Disable when true"
                name="disableWhen"
                onChange={handleChange}
                onBlur={handleUpdateComponent}
              />
            </ListItem>
          </List>
        </CollapseMenu>
        <CollapseMenu label="Display">
          <List component="div" disablePadding>
            <ListItem>
              <TextField
                label="Hide when true"
                name="whenHide"
                onChange={handleChange}
                onBlur={handleUpdateComponent}
              />
            </ListItem>
          </List>
        </CollapseMenu>
      </List>
    </Container>
  );
};

export { EditComponent };
