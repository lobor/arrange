import * as React from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import { createComponent, getComponent } from '../../../../interfaces/Components';
import { getPages } from '../../../../interfaces/Pages';
import { Item } from '../../../../context/component';
import { Card } from '../../styles';
import { Container, GridContainer } from './styles';
import { CellGrid } from './components/CellGrid';
import { IsolateComponent } from './components/IsolateComponent';
// import { useComponent } from '../../hooks/useComponent';

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const [insertComponent] = createComponent(id);
  const { data, status, error } = getPages(id);

  const addCells = React.useCallback(
    (cell: Omit<Item, 'pageId'>) => {
      insertComponent(
        {
          ...cell,
          pageId: id
        }
      );
    },
    [id, insertComponent]
  );

  const grids = React.useMemo(
    () => new Array(300).fill(5).map((e, i) => <CellGrid addCells={addCells} key={i} />),
    [addCells]
  );

  if (!data || status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'error' && error) {
    return <Alert severity="error">{error.toString()}</Alert>;
  }
  return (
    <Container>
      <GridContainer id="contentEditor">{grids}</GridContainer>
      <Card className="card content-edit" style={{ flex: 1 }}>
        {data.data.components.map(comp => {
          return <IsolateComponent component={comp} key={comp._id} />;
        })}
      </Card>
    </Container>
  );
};

export { Editor };
