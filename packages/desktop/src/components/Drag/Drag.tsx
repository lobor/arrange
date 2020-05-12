import * as React from 'react';
import { Button } from 'antd';
import { DragOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import GridLayout, { Layout } from 'react-grid-layout';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import styled from 'styled-components';
import classnames from 'classnames';

import { Component, ComponentText, createComponent, putComponent } from 'interfaces/Components';

import { COMPONENT, gridLayout } from '../../pages/PageEditor/constants';
import { componentContext } from '../../pages/PageEditor/context/component';
import { dragContext } from '../../pages/PageEditor/context/drag';

const Container = styled.div`
  &.isDraggable {
    .react-grid-item.react-grid-placeholder {
      background: #c4d7ed;
      opacity: 0.2;
      transition-duration: 100ms;
      z-index: 2;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
    }
    .react-grid-item:not(.react-grid-placeholder) {
      display: flex;
      align-items: center;
      &:hover {
        .react-resizable-handle {
          width: 20px;
          height: 20px;
          bottom: 0;
          right: 0;
          cursor: se-resize;
          display: block;
          position: absolute;
          bottom: 0;
          right: 0;
          &:after {
            content: '';
            position: absolute;
            right: -5px;
            bottom: -5px;
            width: 10px;
            height: 10px;
            border-right: 2px solid rgba(0, 0, 0, 0.4);
            border-bottom: 2px solid rgba(0, 0, 0, 0.4);
          }
        }
      }
    }
  }
`;

const ContainerComponent = styled.div`
  .containerAction {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    margin-left: -16px;
    margin-top: -16px;
  }
  .container {
    display: none;
    top: -5px;
    bottom: -5px;
    left: -5px;
    right: -5px;
    background-color: #c4d7ed;
    position: absolute;
    z-index: 0;
  }
  &.isDraggable {
    &:hover {
      .containerAction {
        display: block;
      }
      .container {
        display: block;
      }
    }
  }
`;

interface DragProps {
  isDraggable?: boolean;
  components: Component[];
  elementRender: (params: { component: Component }) => React.ReactNode;
  width?: number;
}

const Drag: React.FC<DragProps> = ({ components, isDraggable, elementRender, width }) => {
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
    isDraggable?: boolean;
  } = {
    isDraggable
  };
  if (elementDrag) {
    props.droppingItem = { ...elementDrag, i: 'toto' };
  }
  return (
    <Container className={classnames('layout', { isDraggable })} onClick={handleClick}>
      <GridLayout
        className="card content-edit"
        {...gridLayout}
        width={width || 1200}
        draggableHandle=".buttonHandleDrag"
        autoSize={false}
        compactType={null}
        isDroppable={isDraggable}
        isResizable={isDraggable}
        onDrop={handleDrop}
        onLayoutChange={handleChangeLayout}
        {...props}
      >
        {components &&
          components.map(comp => {
            return (
              <ContainerComponent
                className={classnames({ isDraggable })}
                key={comp._id}
                onClick={handleClickItem(comp)}
                data-grid={comp.position}
              >
                {isDraggable && (
                  <>
                    <div className="containerAction">
                      <Button type="dashed" className="buttonHandleDrag" icon={<DragOutlined />} />
                    </div>
                    <div className="container" />
                  </>
                )}
                {elementRender({ component: comp })}
              </ContainerComponent>
            );
          })}
      </GridLayout>
    </Container>
  );
};

export { Drag };
