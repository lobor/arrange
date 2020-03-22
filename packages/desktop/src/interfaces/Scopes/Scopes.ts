import { Component } from '../Components'
import omit from 'lodash/omit';

export interface Scope {
  name: string;
}

function componentToScope(comp: Component) {
  return omit(comp, ['_id', 'name', 'page', '__v', 'type'])
}

export { componentToScope };
