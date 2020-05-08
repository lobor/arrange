import * as React from 'react';
import { Button } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import GridLayout, { Layout } from 'react-grid-layout';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import styled from 'styled-components';

import { Component, ComponentText, createComponent, putComponent } from 'interfaces/Components';

import { COMPONENT, gridLayout } from '../../pages/PageEditor/constants';
import { componentContext } from '../../pages/PageEditor/context/component';
import { dragContext } from '../../pages/PageEditor/context/drag';

const Container = styled.div`
  .containerHover {
    display: none;
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 100;
  }
  &:hover {
    .containerHover {
      display: block;
    }
  }
`;

interface DragProps {
  components: Component[];
  elementRender: (params: { component: Component }) => React.ReactNode;
  width?: number;
}

const Drag: React.FC<DragProps> = ({ components, elementRender, width }) => {
  const { id } = useParams<{ id: string }>();
  const { toggleItem } = React.useContext(componentContext);
  const { elementDrag } = React.useContext(dragContext);

  const [updateComponent] = putComponent();
  const [insertComponent] = createComponent();

  const addCells = React.useCallback(
    (cell: Omit<Component, 'page'> | Omit<ComponentText, 'page'>) => {
      insertComponent({
        ...cell,
        page: id
      });
    },
    [id, insertComponent]
  );
  const handleChangeLayout = (layouts: Layout[]) => {
    layouts.forEach(layout => {
      const comp = components.find(({ _id }) => _id === layout.i);
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
  const handleClick = () => toggleItem();
  const handleClickItem = (component: Component) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    toggleItem(component);
  };
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
      case COMPONENT.form.type:
        params = {
          name: COMPONENT.form.type,
          position,
          type: COMPONENT.form.type
        };
        break;
    }
    if (params) {
      addCells(params);
    }
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
    <div className="layout" onClick={handleClick}>
      <GridLayout
        className="card content-edit"
        {...gridLayout}
        width={width || 1200}
        draggableHandle=".buttonHandleDrag"
        autoSize={false}
        compactType={null}
        isDroppable={true}
        onDrop={handleDrop}
        onLayoutChange={handleChangeLayout}
        {...props}
      >
        {components &&
          components.map(comp => {
            return (
              <Container key={comp._id} onClick={handleClickItem(comp)} data-grid={comp.position}>
                <div className="containerHover">
                  <Button type="dashed" className="buttonHandleDrag" icon={<DragOutlined />} />
                </div>
                {elementRender({ component: comp })}
              </Container>
            );
          })}
      </GridLayout>
    </div>
  );
};

export { Drag };
