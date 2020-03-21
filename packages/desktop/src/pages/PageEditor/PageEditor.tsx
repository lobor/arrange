import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom';

import { getPages } from '../../interfaces/Pages';
import { Components } from './components/Components'
import { Query } from './components/Query'
import { Container } from './styles';
import { navBarContext } from '../../context/navBar';
import { Editor } from './components/Editor';

const PageEditor = () => {
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
