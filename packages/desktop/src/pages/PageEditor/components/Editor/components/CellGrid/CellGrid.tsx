import * as React from 'react';
import { useDrop } from 'react-dnd';
import { XYCoord } from 'react-dnd';
import omit from 'lodash/omit';
import { Col } from 'antd';

import { TYPE_DRAG, COMPONENT } from '../../../../constants';
import { Component, putComponent, ComponentText } from 'interfaces/Components';

export interface CellGridProps {
  addCells: (cell: Omit<Component, 'page'> | Omit<ComponentText, 'page'>) => void;
}

const CellGrid: React.FC<CellGridProps> = ({ addCells }) => {
  const [updateComponent] = putComponent();

  const [{ item, isOver, position }, drop] = useDrop<
    { type: string; component: Component },
    void,
    { isOver: boolean; position: XYCoord | null, item: any }
  >({
    accept: [TYPE_DRAG.component, TYPE_DRAG.move],
    drop: (item, monitor) => {
      if (position) {
        const container = document.getElementById('contentEditor')!;
        const cellGrid = document.getElementsByClassName('cellGrid')!;
        const width = container.offsetWidth / 10;

        const rest = Math.floor(position.x / width) - 1;
        const x = width * rest - 5;

        const restHeight = Math.floor(position.y / 40) - 1;
        const y = restHeight * 40 - 5;
        // if (item.type === TYPE_DRAG.move) {
        //   updateComponent({
        //     ...omit(item.component, ['_id', '__v']),
        //     style: { width: `${((cellGrid[0] as unknown) as HTMLDivElement).offsetWidth}px` },
        //     id: item.component!._id,
        //     position: { x, y }
        //   });
        // } else if (item.type === TYPE_DRAG.component) {
        //   let params: Omit<Component, 'page'> | Omit<ComponentText, 'page'> | undefined;

        //   switch (item.component.type) {
        //     case COMPONENT.text.type:
        //       params = {
        //         style: { width: `${((cellGrid[0] as unknown) as HTMLDivElement).offsetWidth}px` },
        //         name: item.component.type,
        //         defaultValue: 'Name',
        //         position: {
        //           x,
        //           y
        //         },
        //         type: item.component.type
        //       };
        //       break;
        //     case COMPONENT.textField.type:
        //       params = {
        //         inputType: 'text',
        //         label: 'Label',
        //         required: false,
        //         validation: false,
        //         style: { width: `${((cellGrid[0] as unknown) as HTMLDivElement).offsetWidth}px` },
        //         name: item.component.type,
        //         position: {
        //           x,
        //           y
        //         },
        //         type: item.component.type
        //       };
        //       break;
        //   }
        //   if (params) {
        //     addCells(params);
        //   }
        // }
      }
    },
    collect: monitor => {
      return {
        item: monitor.getItem(),
        position: monitor.getSourceClientOffset(),
        isOver: !!monitor.isOver()
      };
    }
  });
  // console.log(item)
  // if (!item) {
  //   return null
  // }
  return (
    <Col
      span="2"
      style={{
        zIndex: 1,
        height: '40px',
        color: 'transparent',
        background: !isOver
          ? 'url(/cell.jpg) top left no-repeat, url(/cell.jpg) bottom left no-repeat, url(/cell.jpg) top right no-repeat, url(/cell.jpg) bottom right no-repeat'
          : 'red'
      }}
    />
  );
};

export { CellGrid };
