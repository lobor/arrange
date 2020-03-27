import * as React from 'react';

import { Components } from './components/Components';
import { Query } from './components/Query';
import { Container } from './styles';
import { navBarContext } from './context/navBar';
import { Editor } from './components/Editor';
import { Scope } from './components/Scope';

const PageEditor = () => {
  const { toggle: toggleNavBar, edit } = React.useContext(navBarContext);

  React.useEffect(() => {
    if (!edit) {
      toggleNavBar();
    }
    return () => {
      if (edit) {
        toggleNavBar();
      }
    };
  });

  return (
    <Container>
      <Components />
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Editor />
        <Query />
      </div>
      <Scope />
    </Container>
  );
};

export { PageEditor };
