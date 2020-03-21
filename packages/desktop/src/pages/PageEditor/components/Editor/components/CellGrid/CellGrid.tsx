import * as React from 'react';
import { useDrop } from 'react-dnd';
import classnames from 'classnames';
import { XYCoord } from 'react-dnd';
import omit from 'lodash/omit';

import { CellStyled } from '../../styles';
import { TYPE_DRAG } from '../../../../constants';
import { putComponent } from '../../../../../../interfaces/Components';
import { Item } from '../../../../../../context/component';

export interface CellGridProps {
  addCells: (cell: Omit<Item, 'pageId'>) => void;
}

function getName(name: string) {
  return name;
}

const CellGrid: React.FC<CellGridProps> = ({ addCells }) => {
  const [updateComponent] = putComponent();

  const [{ isOver, position }, drop] = useDrop<
    { type: string; component: Item },
    void,
    { isOver: boolean; position: XYCoord | null }
  >({
    accept: [TYPE_DRAG.component, TYPE_DRAG.move],
    drop: (item, monitor) => {
      if (position) {
        const container = document.getElementById('contentEditor')!
        const width = container.offsetWidth / 10

        const rest = Math.floor(position.x / width) - 1
        const x = width * rest - 5;

        const restHeight = Math.floor(position.y / 40) - 1
        const y = restHeight * 40 - 5;
        if (item.type === TYPE_DRAG.move) {
          updateComponent({
            ...omit(item.component, ['_id', '__v']),
            id: item.component!._id,
            position: { x, y }
          });
        } else if (item.type === TYPE_DRAG.component) {
          addCells({
            name: getName(item.component.type),
            position: {
              x,
              y
            },
            type: item.component.type
          });
        }
      }
    },
    collect: monitor => {
      return {
        position: monitor.getSourceClientOffset(),
        isOver: !!monitor.isOver()
      };
    }
  });
  return <CellStyled className={classnames({ isOver })} ref={drop} />;
};

export { CellGrid };
