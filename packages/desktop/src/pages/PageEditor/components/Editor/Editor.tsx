import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Row, Card, Alert, Spin } from 'antd';

import { Component, ComponentText, createComponent } from 'interfaces/Components';
import { getPages } from 'interfaces/Pages';
import { componentContext } from '../../context/component';
import { Container, GridContainer } from './styles';
import { CellGrid } from './components/CellGrid';
import { IsolateComponent } from './components/IsolateComponent';

const Editor = () => {
  const { toggleItem } = React.useContext(componentContext);
  const { id } = useParams<{ id: string }>();
  const [insertComponent] = createComponent();
  const { data, status, error } = getPages(id);

  const addCells = React.useCallback(
    (cell: Omit<Component, 'page'> | Omit<ComponentText, 'page'>) => {
      insertComponent({
        ...cell,
        page: id
      });
    },
    [id, insertComponent]
  );

  const handleClick = () => toggleItem();
  return (
    <Container>
      <GridContainer>
        <Row id="contentEditor" onClick={handleClick}>
          {new Array(300).fill(5).map((e, i) => (
            <CellGrid addCells={addCells} key={i} />
          ))}
        </Row>
      </GridContainer>
      {/* <Card className="card content-edit" style={{ flex: 1 }}>
        {status === 'error' && error && (
          <Alert message="Error" description={error.toString()} type="error" showIcon />
        )}
        {status === 'loading' && <Spin size="large" />}
        {data &&
          data.data.components.map(comp => {
            return <IsolateComponent component={comp} key={comp._id} />;
          })}
      </Card> */}
    </Container>
  );
};

export { Editor };
