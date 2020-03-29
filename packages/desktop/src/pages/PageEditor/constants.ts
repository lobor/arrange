import { ScopeType } from '../../interfaces/Components';

interface PositionParams {
  margin: [number, number],
  containerPadding: [number, number],
  containerWidth: number,
  cols: number,
  rowHeight: number,
  maxRows: number
}

const TYPE_DRAG = {
  component: 'component',
  move: 'move'
};

const COMPONENT: {
  table: { type: ScopeType };
  textField: { type: ScopeType };
  text: { type: ScopeType };
} = {
  table: { type: 'table' },
  textField: { type: 'textField' },
  text: { type: 'text' },
};

const gridLayout: PositionParams = {
  margin: [10, 10],
  containerPadding: [10, 10],
  containerWidth: 1200,
  cols: 12,
  rowHeight: 40,
  maxRows: Infinity
}

export { COMPONENT, TYPE_DRAG, gridLayout };
