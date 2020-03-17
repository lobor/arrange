import * as React from 'react';
import { useDrop } from 'react-dnd';
import classnames from 'classnames';
import { XYCoord } from 'react-dnd';

import { CellStyled } from '../../styles';
import { TYPE_DRAG } from '../../../../constants';
import { Item } from '../../../../../../context/component';

export interface CellGridProps {
  addCells: (cell: Item) => void;
}

function getName(name: string) {
  return name;
}

const CellGrid: React.FC<CellGridProps> = ({ addCells }) => {
  const [{ isOver, position }, drop] = useDrop<
    { type: string; component: { type: string } },
    void,
    { isOver: boolean; position: XYCoord | null }
  >({
    accept: TYPE_DRAG.component,
    drop: (item, monitor) => {
      if (position) {
        const x = position.x - (window.innerWidth * 15) / 100 - 5;
        const y = position.y - 64 - 5;
        addCells({
          name: getName(item.component.type),
          position: {
            x,
            y
          },
          type: item.component.type
        });
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
