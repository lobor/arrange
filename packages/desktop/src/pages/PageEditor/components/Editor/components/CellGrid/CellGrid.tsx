import * as React from 'react';
import { useDrop } from 'react-dnd';
import classnames from 'classnames';
import { XYCoord } from 'react-dnd';
import omit from 'lodash/omit';

import { CellStyled } from '../../styles';
import { TYPE_DRAG } from '../../../../constants';
import { useAxios } from '../../../../../../hooks/useAxios';
import { Item } from '../../../../../../context/component';

export interface CellGridProps {
  addCells: (cell: Item) => void;
}

function getName(name: string) {
  return name;
}

const CellGrid: React.FC<CellGridProps> = ({ addCells }) => {
  const [, updateComponent] = useAxios<{ _id: string }>(
    { url: 'updateComponent', method: 'POST' },
    { manual: true }
  );

  const [{ isOver, position }, drop] = useDrop<
    { type: string; component: Item },
    void,
    { isOver: boolean; position: XYCoord | null }
  >({
    accept: [TYPE_DRAG.component, TYPE_DRAG.move],
    drop: (item, monitor) => {
      if (position) {
        const x = position.x - (window.innerWidth * 15) / 100 - 5;
        const y = position.y - 64 - 5;
        console.log('type', item);
        if (item.type === TYPE_DRAG.move) {
          updateComponent({
            data: {
              ...omit(item.component, ['_id', '__v']),
              id: item.component!._id,
              position: { x, y }
            }
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
