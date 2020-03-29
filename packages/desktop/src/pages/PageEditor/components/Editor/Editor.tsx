import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Spin } from 'antd';
import GridLayout, { Layout } from 'react-grid-layout';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

import { Component, ComponentText, createComponent, putComponent } from 'interfaces/Components';
import { getPages } from 'interfaces/Pages';
import { componentContext } from '../../context/component';
import { dragContext } from '../../context/drag';
import { Container } from './styles';
import { COMPONENT, gridLayout } from '../../constants';
import { IsolateComponent } from './components/IsolateComponent';

const Editor = () => {
  const [updateComponent] = putComponent();
  const { toggleItem } = React.useContext(componentContext);
  const { elementDrag } = React.useContext(dragContext);
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

  const handleDrop = (e: {
    x: number;
    y: number;
    w: number;
    h: number;
    e: Event & { componentType: string };
  }) => {
    const {
      e: { componentType },
      ...position
    } = e;
    // console.log(e);
    let params: Omit<Component, 'page'> | Omit<ComponentText, 'page'> | undefined;
    switch (componentType) {
      case COMPONENT.text.type:
        params = {
          name: COMPONENT.text.type,
          defaultValue: 'Name',
          position,
          type: COMPONENT.text.type
        };
        break;
      case COMPONENT.textField.type:
        params = {
          inputType: 'text',
          label: 'Label',
          required: false,
          validation: false,
          name: COMPONENT.textField.type,
          position,
          type: COMPONENT.textField.type
        };
        break;
      case COMPONENT.table.type:
        params = {
          name: COMPONENT.table.type,
          position,
          type: COMPONENT.table.type
        };
        break;
    }
    if (params) {
      addCells(params);
    }
  };
  const handleChangeLayout = (layouts: Layout[]) => {
    layouts.forEach(layout => {
      const comp = data!.data.components.find(({ _id }) => _id === layout.i);
      if (
        comp &&
        JSON.stringify(comp.position) !== JSON.stringify(pick(layout, ['h', 'w', 'x', 'y']))
      ) {
        updateComponent({
          ...omit(comp, ['_id', '__v']),
          id: comp!._id,
          position: pick(layout, ['h', 'w', 'x', 'y'])
        });
      }
    });
  };
  const handleClickItem = (component: Component) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    toggleItem(component);
  };
  const props: {
    droppingItem?: {
      i: string;
      w: number;
      h: number;
    };
  } = {};
  if (elementDrag) {
    props.droppingItem = { ...elementDrag, i: 'toto' };
  }
  return (
    <Container>
      {status === 'error' && error && (
        <Alert message="Error" description={error.toString()} type="error" showIcon />
      )}
      {status === 'loading' && <Spin size="large" />}
      <div className="layout" onClick={handleClick}>
        <GridLayout
          className="card content-edit"
          {...gridLayout}
          width={1200}
          autoSize={false}
          compactType={null}
          isDroppable={true}
          onDrop={handleDrop}
          onLayoutChange={handleChangeLayout}
          {...props}
        >
          {data &&
            data.data.components.map(comp => {
              return (
                <div key={comp._id} onClick={handleClickItem(comp)} data-grid={comp.position}>
                  <IsolateComponent component={comp} key={comp._id} />
                </div>
              );
            })}
        </GridLayout>
      </div>
    </Container>
  );
};

export { Editor };
