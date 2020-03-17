import * as React from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import { useAxios } from '../../hooks/useAxios';
import { Components } from './components/Components'
import { Query } from './components/Query'
import { Container } from './styles';
import { navBarContext } from '../../context/navBar';
import { Editor } from './components/Editor';

const PageEditor = () => {
  const { id } = useParams<{ id: string }>();
  const [{ data, loading, error }] = useAxios<{ _id: string }[]>({
    url: 'getPage',
    params: { id }
  });

  const { toggle: toggleNavBar, edit } = React.useContext(navBarContext);

  React.useEffect(() => {
    if (!edit) {
      toggleNavBar()
    }
    return () => {
      if (edit) {
        toggleNavBar()
      }
    }
  })
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
        <Editor />
        <Query />
      </div>
    </Container>
  );
};

export { PageEditor };
