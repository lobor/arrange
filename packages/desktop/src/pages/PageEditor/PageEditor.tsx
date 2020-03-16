import * as React from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import styled from 'styled-components';

import { useAxios } from '../../hooks/useAxios';
import { Components } from './components/Components'
import { Query } from './components/Query'
import { Card } from './styles';
import { componentContext, queryContext } from './context'

const Container = styled.div`
  bottom: 0;
  display: flex;
  flex-direction: row;
  left: 0;
  position: absolute;
  right: 0;
  top: 64px;
  .content-edit {
    background-color: #f4f4f4;
  }
`;

const PageEditor = () => {
  const { id } = useParams<{ id: string }>();
  const [{ data, loading, error }] = useAxios<{ _id: string }[]>({
    url: 'getPage',
    params: { id }
  });

  const { toggle: toggleComponent } = React.useContext(componentContext);
  const { toggle: toggleQuery } = React.useContext(queryContext);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error.toString()}</Alert>;
  }

  if (!data) {
    return <Alert severity="warning">Not found page</Alert>;
  }

  return (
    <Container>
      <Components />
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Card className="card content-edit" style={{ flex: 1 }}>
          <Button onClick={toggleComponent}>Components</Button>
          <Button onClick={toggleQuery}>Query</Button>
        </Card>
        <Query />
      </div>
    </Container>
  );
};

export { PageEditor };
