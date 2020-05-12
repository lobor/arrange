import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Spin } from 'antd';

import { Drag } from 'components/Drag';
import { getPages } from 'interfaces/Pages';
import { Container } from './styles';
import { IsolateComponent } from './components/IsolateComponent';

interface EditorProps {
  isDraggable?: boolean;
}

const Editor: React.FC<EditorProps> = ({ isDraggable } = { isDraggable: true }) => {
  const { id } = useParams<{ id: string }>();
  const { data, status, error } = getPages(id);
  return (
    <Container>
      {status === 'error' && error && (
        <Alert message="Error" description={error.toString()} type="error" showIcon />
      )}
      {status === 'loading' && <Spin size="large" />}
      <Drag
        isDraggable={isDraggable}
        components={(data && data.data.components) || []}
        elementRender={({ component }) => (
          <IsolateComponent component={component} key={component._id} />
        )}
      />
    </Container>
  );
};

export { Editor };
