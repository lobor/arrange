import { Component } from '../Components';
import { Queries } from '../Queries';
import omit from 'lodash/omit';

export interface Scope extends Omit<Component, 'page' | '__v' | 'type'> {
  value?: Component['defaultValue'];
}

export interface ScopeQueries extends Omit<Queries, 'page' | '__v' | 'type'> {
  data?: any;
}

declare global {
  interface Window {
    dndTool: {
      scope: {
        [key: string]: Scope;
      };
    };
  }
}

class ScopeInterface {
  static get() {}

  static add(scope: Component) {
    if (!window.dndTool) {
      window.dndTool = {
        scope: {}
      };
    }
    window.dndTool.scope[scope.name] = ScopeInterface.componentToScope(scope) as Scope;
  }

  static componentToScope(comp: Component) {
    return omit<Scope>(comp, ['_id', 'name', 'page', '__v', 'type']);
  }
}

export { ScopeInterface as default, ScopeInterface };
