import { ScopeType } from '../../interfaces/Components';

const TYPE_DRAG = {
  component: 'component',
  move: 'move'
};

const COMPONENT: {
  textField: {
    type: ScopeType;
  };
  text: {
    type: ScopeType;
  };
} = {
  textField: {
    type: 'textField'
  },
  text: {
    type: 'text'
  }
};

export { COMPONENT, TYPE_DRAG };
