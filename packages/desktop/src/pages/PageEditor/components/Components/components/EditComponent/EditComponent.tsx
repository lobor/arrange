import * as React from 'react';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import omit from 'lodash/omit';

import { TextField } from '../../../../../../components/TextField';
import { deleteComponent, putComponent } from '../../../../../../interfaces/Components';
// import { useComponent } from '../../../../hooks/useComponent';
import { Item, componentContext } from '../../../../../../context/component';

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

  const [removeComponent] = deleteComponent()
  const [updateComponent] = putComponent()

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

  if (!item || !values) return null;

  return (
    <div>
      <TextField
        value={values!.name}
        name="name"
        onChange={handleChange}
        onBlur={handleUpdateComponent}
      />
      <Button onClick={handleDelete} variant="contained" color="secondary">
        Delete
      </Button>
    </div>
  );
};

export { EditComponent };
