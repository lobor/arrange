import * as React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { queries } from 'interfaces/Queries';
import { Editor } from '../PageEditor/components/Editor';

const Container = styled.div`
  height: 100%;
  display: flex;
`;

const PageView = () => {
  const { id } = useParams();
  queries();
  return (
    <Container>
      <Button
        style={{ position: 'absolute', right: '30px', top: '70px', width: 'auto', zIndex: 100 }}
      >
        <Link to={`/pages/editor/${id}`}>Edit</Link>
      </Button>
      <Editor isDraggable={false} />
    </Container>
  );
};

export { PageView };
