import * as React from 'react';
import classnames from 'classnames';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import { Item, componentContext } from '../../../../context/component';
import { useAxios } from '../../../../hooks/useAxios';
import { Card } from '../../styles';
import { TextField } from '../../../../components/TextField';
import { Container, GridContainer, OverlayComponent } from './styles';
import { CellGrid } from './components/CellGrid';
import { useComponent } from '../../hooks/useComponent';

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const [, insertComponent] = useAxios<{ _id: string }>(
    { url: 'insertComponent', method: 'POST' },
    { manual: true }
  );
  const [{ data, loading, error }, setCells] = useComponent(id);
  const { item, toggleItem } = React.useContext(componentContext);

  const addCells = React.useCallback(
    async (cell: Item) => {
      await insertComponent({
        data: {
          ...cell,
          pageId: id
        }
      });
      setCells();
    },
    [id, insertComponent, setCells]
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error.toString()}</Alert>;
  }
  return (
    <Container>
      <GridContainer>
        {new Array(250).fill(5).map((e, i) => (
          <CellGrid addCells={addCells} key={i} />
        ))}
      </GridContainer>
      <Card className="card content-edit" style={{ flex: 1 }}>
        {data.map(({ name, position, ...other }, i) => {
          if (!position) return null;
          const style = { left: position.x, top: position.y };
          return (
            <OverlayComponent
              style={style}
              onClick={() => toggleItem({ name, position, ...other })}
              key={`${name}-${i}`}
            >
              <TextField
                size="small"
                className={classnames({ active: item && item.name === name })}
              />
            </OverlayComponent>
          );
        })}
      </Card>
    </Container>
  );
};

export { Editor };
